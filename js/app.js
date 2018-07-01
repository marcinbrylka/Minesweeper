import '../scss/main.scss';

document.addEventListener("DOMContentLoaded", function () {

    const mS = document.querySelector(".minesCounter .mS");
    const mD = document.querySelector(".minesCounter .mD");
    const mJ = document.querySelector(".minesCounter .mJ");
    const tS = document.querySelector(".timer .tS");
    const tD = document.querySelector(".timer .tD");
    const tJ = document.querySelector(".timer .tJ");

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
            }

            tJ.innerHTML = "" + num1;
            tD.innerHTML = "" + num2;
            tS.innerHTML = "" + num3;

        }, 1000);

    };

    const clearTimer = () => {
        clearInterval(timerInterval);

        tS.innerHTML = "" + 0;
        tD.innerHTML = "" + 0;
        tJ.innerHTML = "" + 0;
        num1 = 0;
        num2 = 0;
        num3 = 0;
        startTimer = 0;
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
    };

    const saperPicture = document.querySelector(".saperPicture");
    saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
    const main = document.querySelector(".mainContainer");
    const board = document.querySelector(".boardContainer");
    const info = document.querySelector(".informationContainer");
    const menu = document.querySelector(".menuContainer");
    info.style.width = board.style.width;
    let cells = [];
    let cellsNumbers = [];
    let numberOfCells;
    let floodFillCounter = 0;


    class Minesweeper {
        constructor(boardColumns, boardRows, numberOfMines) {
            this.boardColumns = boardColumns;
            this.boardRows = boardRows;
            this.numberOfMines = numberOfMines;
        }

        createBoard() {
            console.log(this.numberOfMines);
            main.style.width = this.boardColumns * 35 + 45 + "px";
            board.style.width = this.boardColumns * 35 + 6 + "px";
            board.style.height = this.boardRows * 35 + 6 + "px";
            info.style.width = this.boardColumns * 35 + 6 + "px";
            menu.style.width = this.boardColumns * 35 + 6 + "px";
            numberOfCells = this.boardRows * this.boardColumns;
            for (let i = 0; i < this.boardRows; i++) {
                cells.push([]);
            }
            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    const newCell = document.createElement("div");
                    newCell.classList.add("unknown");
                    board.appendChild(newCell);
                    cells[i].push(newCell);

                }
            }

            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    cells[i][j].addEventListener("contextmenu", function (e) {
                        e.preventDefault();
                    });


                    cells[i][j].addEventListener("mousedown", function (e) {
                        if (e.button === 0 && !cells[i][j].classList.contains("gameOver")) {
                            if (this.innerText !== "🚩" && this.innerText !== "?" && !this.classList.contains("known")) {
                                this.className = "known";
                                saperPicture.style.backgroundImage = "url(images/face_active.png)";
                            }
                        }
                    });

                    cells[i][j].addEventListener("mousedown", (e) => {
                        if (e.button === 1 && !cells[i][j].classList.contains("gameOver")) {
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
                        if (e.button === 0 && !cells[i][j].classList.contains("gameOver")) {
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

            mS.innerHTML = "" + s;
            mD.innerHTML = "" + d;
            mJ.innerHTML = "" + j;
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
                window.alert("You WON!");
                stopTimer();
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
                saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
            }
            if (cellsNumbers[x][y] >= 1 && cellsNumbers[x][y] <= 8) {
                cells[x][y].className = "known";
                saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
                for (let i = 1; i < 9; i++) {
                    if (cellsNumbers[x][y] === i) {
                        cells[x][y].classList.add("number" + i);
                        cells[x][y].innerText = cellsNumbers[x][y];
                    }
                }
            }

            if (cellsNumbers[x][y] === -1) {
                stopTimer();
                saperPicture.style.backgroundImage = "url(images/face_lose.png)";
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


        // helpFunctionToCheckEverything() {

        // }

    }

    let difficult = 0;

    const minesweeper = new Minesweeper(15, 15, 30);
    minesweeper.createBoard();
    minesweeper.createCellsNumbers();
    minesweeper.minesCounter();


    saperPicture.addEventListener("mousedown", function () {
        saperPicture.style.backgroundImage = "url(images/face_pressed.png)";
    });
    saperPicture.addEventListener("mouseup", () => {
        saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        if (difficult === 1) {
            const minesweeper = new Minesweeper(9, 9, 10);
            minesweeper.clearBoard();
            minesweeper.createCellsNumbers();
            minesweeper.createBoard();
            minesweeper.minesCounter();
            clearTimer();
            return;
        }
        if (difficult === 2) {
            const minesweeper = new Minesweeper(15, 15, 30);
            minesweeper.clearBoard();
            minesweeper.createCellsNumbers();
            minesweeper.createBoard();
            minesweeper.minesCounter();
            clearTimer();
            return;
        }
        if (difficult === 3) {
            const minesweeper = new Minesweeper(30, 16, 99);
            minesweeper.clearBoard();
            minesweeper.createCellsNumbers();
            minesweeper.createBoard();
            minesweeper.minesCounter();
            clearTimer();
            return;
        }
        if (difficult === 0) {
            const minesweeper = new Minesweeper(15, 15, 30);
            minesweeper.clearBoard();
            minesweeper.createCellsNumbers();
            minesweeper.createBoard();
            minesweeper.minesCounter();
            clearTimer();
            console.log(difficult);
        }
    });

    // minesweeper.helpFunctionToCheckEverything();

    const menuEasy = document.querySelector(".easy");
    const menuMedium = document.querySelector(".medium");
    const menuHard = document.querySelector(".hard");
    menuEasy.addEventListener("click", () => {
        saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 1;
        const minesweeper = new Minesweeper(9, 9, 1);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
        minesweeper.minesCounter();
        clearTimer();
    });
    menuMedium.addEventListener("click", () => {
        saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 2;
        const minesweeper = new Minesweeper(15, 15, 30);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
        minesweeper.minesCounter();
        clearTimer();
    });
    menuHard.addEventListener("click", () => {
        saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        difficult = 3;
        const minesweeper = new Minesweeper(30, 16, 99);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
        minesweeper.minesCounter();
        clearTimer();
    })


});