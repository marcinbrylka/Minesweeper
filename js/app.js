import '../scss/main.scss';
import {Selectors} from "./selectors.js"
import {WinForm} from "./winform.js"


document.addEventListener("DOMContentLoaded", function () {
    // localStorage.clear();
    const selectors = new Selectors();

    window.addEventListener("load", function () {

        let playerEasy = JSON.parse(localStorage.getItem("arrayEasy"));
        let playerMedium = JSON.parse(localStorage.getItem("arrayMedium"));
        let playerHard = JSON.parse(localStorage.getItem("arrayHard"));

        for (let i = 0; i < 10; i++) {
            for (let j = 1; j < 3; j++) {
                if (localStorage.arrayEasy !== undefined) {
                    selectors.easyTable.children[0].children[i].children[j].innerHTML = playerEasy[i][j - 1];
                }
                if (localStorage.arrayMedium !== undefined) {
                    selectors.mediumTable.children[0].children[i].children[j].innerHTML = playerMedium[i][j - 1];
                }
                if (localStorage.arrayHard !== undefined) {
                    selectors.hardTable.children[0].children[i].children[j].innerHTML = playerHard[i][j - 1];
                }
            }
        }
    });

    let timerInterval;
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;
    let startTimer = 0;


    const timer = () => {

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            num1++;
            if (num1 === 10) {
                num1 = 0;
                num2++;
            }
            if (num2 === 10) {
                num2 = 0;
                num3++;
            }
            if (num3 === 10) {
                clearInterval(timerInterval);
                return;
            }

            selectors.tJ.innerHTML = "" + num1;
            selectors.tD.innerHTML = "" + num2;
            selectors.tS.innerHTML = "" + num3;

        }, 1000);

    };

    const clearTimer = () => {
        clearInterval(timerInterval);

        selectors.tS.innerHTML = "" + 0;
        selectors.tD.innerHTML = "" + 0;
        selectors.tJ.innerHTML = "" + 0;
        num1 = 0;
        num2 = 0;
        num3 = 0;
        startTimer = 0;
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
    };

    selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
    selectors.info.style.width = selectors.board.style.width;
    let cells = [];
    let cellsNumbers = [];
    let numberOfCells;
    let floodFillCounter = 0;

    class rankingTable {
        constructor() {
        }


    }


    class Minesweeper {
        constructor(boardColumns, boardRows, numberOfMines, difficult) {
            this.boardColumns = boardColumns;
            this.boardRows = boardRows;
            this.numberOfMines = numberOfMines;
            this.difficult = difficult;
            this.winForm = new WinForm();
        }

        createBoard() {

            console.log(this.numberOfMines);
            selectors.main.style.width = this.boardColumns * 35 + 45 + "px";
            selectors.board.style.width = this.boardColumns * 35 + 6 + "px";
            selectors.board.style.height = this.boardRows * 35 + 6 + "px";
            selectors.info.style.width = this.boardColumns * 35 + 6 + "px";
            selectors.menu.style.width = this.boardColumns * 35 + 6 + "px";
            numberOfCells = this.boardRows * this.boardColumns;
            const buttonFlag = selectors.buttonFlag;
            for (let i = 0; i < this.boardRows; i++) {
                cells.push([]);
            }
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    const newCell = document.createElement("div");
                    newCell.classList.add("unknown");
                    selectors.board.appendChild(newCell);
                    cells[i].push(newCell);

                }
            }

            buttonFlag.addEventListener("mouseup", function () {
                this.classList.toggle("flagActive");
            });

            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    cells[i][j].addEventListener("contextmenu", function (e) {
                        e.preventDefault();
                    });


                    cells[i][j].addEventListener("mousedown", function (e) {
                        if (e.button === 0 && !cells[i][j].classList.contains("gameOver")) {
                            if (this.innerText !== "🚩" && this.innerText !== "?" && !this.classList.contains("known")) {
                                selectors.saperPicture.style.backgroundImage = "url(images/face_active.png)";
                            }
                        }
                    });

                    cells[i][j].addEventListener("mousedown", (e) => {
                        if (e.button === 1 && !cells[i][j].classList.contains("gameOver")) {
                            e.preventDefault();
                            this.showNeighboursCells(i, j);

                            for (let i = 0; i < this.boardRows; i++) {
                                for (let j = 0; j < this.boardColumns; j++) {
                                    cells[i][j].addEventListener("mouseenter", () => {
                                        if (!cells[i][j].classList.contains("gameOver")) {
                                            this.showNeighboursCells(i, j);
                                        }
                                    });
                                    cells[i][j].addEventListener("mouseleave", () => {
                                        if (!cells[i][j].classList.contains("gameOver")) {
                                            this.hideNeighboursCells(i, j);
                                        }
                                    })
                                }
                            }
                        }
                    });

                    cells[i][j].addEventListener("mouseup", (e) => {
                        if (e.button === 1 && !cells[i][j].classList.contains("gameOver")) {
                            this.hideNeighboursCells(i, j);
                            for (let i = 0; i < this.boardRows; i++) {
                                for (let j = 0; j < this.boardColumns; j++) {
                                    cells[i][j].addEventListener("mouseenter", () => {
                                        if (!cells[i][j].classList.contains("gameOver")) {
                                            this.hideNeighboursCells(i, j);
                                        }
                                    });
                                    cells[i][j].addEventListener("mouseleave", () => {
                                        if (!cells[i][j].classList.contains("gameOver")) {
                                            this.hideNeighboursCells(i, j);
                                        }
                                    })
                                }
                            }
                        }
                    });

                    cells[i][j].addEventListener("mouseup", (e) => {
                        if (e.button === 0 && !cells[i][j].classList.contains("gameOver") && !buttonFlag.classList.contains("flagActive")) {
                            if (startTimer === 0) {
                                timer();
                                startTimer = 1;
                            }
                            if (cells[i][j].innerText === "🚩") {
                                return false;
                            }
                            if (cells[i][j].innerText === "?") {
                                return false;
                            }
                            this.reveal(i, j);

                        }

                        if (e.button === 0 && !cells[i][j].classList.contains("gameOver") && buttonFlag.classList.contains("flagActive")) {
                            if (cells[i][j].className === "unknown") {
                                if (cells[i][j].innerText === "") {
                                    cells[i][j].innerText = "🚩";
                                    this.numberOfMines--;
                                    this.minesCounter();
                                    if (this.numberOfMines === 0) {
                                        this.win();
                                    }
                                } else if (cells[i][j].innerText === "🚩") {
                                    cells[i][j].innerText = "?";
                                    this.numberOfMines++;
                                    this.minesCounter();
                                } else if (cells[i][j].innerText === "?") {
                                    cells[i][j].innerText = "";
                                }
                            }
                            console.log(this.numberOfMines);
                        }

                        if (e.button === 2) {
                            if (cells[i][j].className === "unknown") {
                                if (cells[i][j].innerText === "") {
                                    cells[i][j].innerText = "🚩";
                                    this.numberOfMines--;
                                    this.minesCounter();
                                    if (this.numberOfMines === 0) {
                                        this.win();
                                    }
                                } else if (cells[i][j].innerText === "🚩") {
                                    cells[i][j].innerText = "?";
                                    this.numberOfMines++;
                                    this.minesCounter();
                                } else if (cells[i][j].innerText === "?") {
                                    cells[i][j].innerText = "";
                                }
                            }
                            console.log(this.numberOfMines);
                        }
                    });

                }
            }

        }

        clearBoard() {
            const cell = document.querySelectorAll(".boardContainer > div");
            for (let i = 0; i < numberOfCells; i++) {
                cell[i].remove();
            }
            cells = [];
            cellsNumbers = [];
        }

        createCellsNumbers() {
            for (let i = 0; i < this.boardRows; i++) {
                cellsNumbers.push([]);
            }
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    cellsNumbers[i].push("");
                }
            }
            this.generateMines();
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    if (cellsNumbers[i][j] !== -1)
                        cellsNumbers[i][j] = this.checkNeighbours(i, j);
                }
            }
            console.log(cellsNumbers);
            console.log(cells);
        }

        minesCounter() {
            let s = Math.floor(this.numberOfMines / 100 % 10);
            let d = Math.floor(this.numberOfMines / 10 % 10);
            let j = this.numberOfMines % 10;

            selectors.mS.innerHTML = "" + s;
            selectors.mD.innerHTML = "" + d;
            selectors.mJ.innerHTML = "" + j;
        };

        checkNeighbours(x, y) {

            let mines = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardRows && y + j >= 0 && y + j < this.boardColumns) {
                        if (i !== 0 || j !== 0) {
                            if (cellsNumbers[x + i][y + j] === -1) {
                                mines += 1;
                            }
                        }
                    }
                }
            }
            return mines;
        };

        generateMines() {
            for (let i = 0; i < this.numberOfMines; i++) {
                cellsNumbers[Math.floor(Math.random() * (this.boardRows - 1))][Math.floor(Math.random() * (this.boardColumns - 1))] = -1;
            }
            this.checkGeneratedMines();
        };

        checkGeneratedMines() {
            let mines = 0;
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    if (cellsNumbers[i][j] === -1) {
                        mines++;
                    }
                }
            }
            if (mines !== this.numberOfMines) {
                this.generateAnotherMines(mines);
            }
        }

        generateAnotherMines(mines) {
            for (let i = 0; i < this.numberOfMines - mines; i++) {
                cellsNumbers[Math.floor(Math.random() * (this.boardRows - 1))][Math.floor(Math.random() * (this.boardColumns - 1))] = -1;
            }
            this.checkGeneratedMines();
        }

        win() {
            let counter = 0;
            let mines = 0;
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    if (cells[i][j].innerText === "🚩" && cellsNumbers[i][j] === -1) {
                        counter++;
                    }
                    if (cellsNumbers[i][j] === -1) {
                        mines++;
                    }
                }
            }
            if (counter === mines) {
                for (let i = 0; i < this.boardRows; i++) {
                    for (let j = 0; j < this.boardColumns; j++) {
                        cells[i][j].classList.add("gameOver");

                    }
                }
                stopTimer();
                this.winForm.showWinForm(this.difficult);
            }
        }

        floodFill(x, y) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardRows && y + j >= 0 && y + j < this.boardColumns) {
                        if (cellsNumbers[x + i][y + j] !== -1 && cells[x + i][y + j].className !== "known" && cells[x + i][y + j].innerText === "") {
                            this.reveal(x + i, y + j);

                        }
                    }
                }
            }
        }

        showNeighboursCells(x, y) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardRows && y + j >= 0 && y + j < this.boardColumns) {
                        if (cells[x + i][y + j].className !== "known" && cells[x + i][y + j].innerText === "") {
                            cells[x + i][y + j].className = "known";
                            cells[x + i][y + j].classList.add("helpClass")
                        }
                    }
                }
            }
        }

        hideNeighboursCells(x, y) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardRows && y + j >= 0 && y + j < this.boardColumns) {
                        if (cells[x + i][y + j].classList.contains("known") && cells[x + i][y + j].innerText === "" && cells[x + i][y + j].classList.contains("helpClass")) {
                            cells[x + i][y + j].className = "unknown"
                        }
                    }
                }
            }
        }

        reveal(x, y) {
            if (cellsNumbers[x][y] === 0) {
                cells[x][y].className = "known";
                selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
            }
            if (cellsNumbers[x][y] >= 1 && cellsNumbers[x][y] <= 8) {
                cells[x][y].className = "known";
                selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
                for (let i = 1; i < 9; i++) {
                    if (cellsNumbers[x][y] === i) {
                        cells[x][y].classList.add("number" + i);
                        cells[x][y].innerText = cellsNumbers[x][y];
                    }
                }
            }

            if (cellsNumbers[x][y] === -1) {
                stopTimer();
                selectors.saperPicture.style.backgroundImage = "url(images/face_lose.png)";
                for (let i = 0; i < this.boardRows; i++) {
                    for (let j = 0; j < this.boardColumns; j++) {
                        cells[i][j].classList.add("gameOver");
                        if (cellsNumbers[i][j] === -1) {
                            cells[i][j].classList.add("known");
                            cells[i][j].style.backgroundImage = "url(images/saper.png)";
                        }
                    }
                }
                return;
            }
            if (this.checkNeighbours(x, y) === 0) {
                floodFillCounter += 1;
                this.floodFill(x, y)
            }
        }

        start() {
            this.clearBoard();
            this.createCellsNumbers();
            this.createBoard();
            this.minesCounter();
        }

    }

    let difficult = 0;

    const minesweeper = new Minesweeper(15, 15, 30, "medium");
    minesweeper.createBoard();
    minesweeper.createCellsNumbers();
    minesweeper.minesCounter();


    selectors.saperPicture.addEventListener("mousedown", function () {
        selectors.saperPicture.style.backgroundImage = "url(images/face_pressed.png)";
    });
    selectors.saperPicture.addEventListener("mouseup", () => {
        selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        if (difficult === 1) {
            const minesweeper = new Minesweeper(9, 9, 10, "easy");
            minesweeper.start();
            clearTimer();
            return;
        }
        if (difficult === 2) {
            const minesweeper = new Minesweeper(15, 15, 30, "medium");
            minesweeper.start();
            clearTimer();
            return;
        }
        if (difficult === 3) {
            const minesweeper = new Minesweeper(30, 16, 99, "hard");
            minesweeper.start();
            clearTimer();
            return;
        }
        if (difficult === 0) {
            const minesweeper = new Minesweeper(15, 15, 30, "medium");
            minesweeper.start();
            clearTimer();
            console.log(difficult);
        }
    });

    // minesweeper.helpFunctionToCheckEverything();

    const menuEasy = document.querySelector(".easy");
    const menuMedium = document.querySelector(".medium");
    const menuHard = document.querySelector(".hard");
    menuEasy.addEventListener("click", () => {
        selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 1;
        const minesweeper = new Minesweeper(9, 9, 10, "easy");
        minesweeper.start();
        clearTimer();
        console.log(minesweeper);
    });
    menuMedium.addEventListener("click", () => {
        selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 2;
        const minesweeper = new Minesweeper(15, 15, 30, "medium");
        minesweeper.start();
        clearTimer();
    });
    menuHard.addEventListener("click", () => {
        selectors.saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 3;
        const minesweeper = new Minesweeper(30, 16, 99, "hard");
        minesweeper.start();
        clearTimer();
    });


});