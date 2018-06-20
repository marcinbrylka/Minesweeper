import '../scss/main.scss';

document.addEventListener("DOMContentLoaded", function () {

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
            main.style.width = this.boardRows * 50 + 60 + "px";
            board.style.width = this.boardRows * 50 + 7 + "px";
            board.style.height = this.boardColumns * 50 + 7 + "px";
            info.style.width = this.boardRows * 50 + "px";
            menu.style.width = this.boardRows * 50 + "px";
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

                    // cells[i][j].addEventListener("mousedown", function (e) {
                    //     if (e.button === 0) {
                    //         if (this.innerText !== "🚩" && this.innerText !== "?") {
                    //             this.className = "known"
                    //         }
                    //     }
                    // });

                    cells[i][j].addEventListener("mouseup", (e) => {
                        if (e.button === 0) {
                            if (cellsNumbers[i][j] === 0) {
                                this.reveal(i, j);
                            }
                        }
                    });

                    cells[i][j].addEventListener("mouseup", function (e) {
                        if (e.button === 0) {
                            if (this.innerText === "🚩") {
                                return false;
                            }
                            if (this.innerText === "?") {
                                return false;
                            }
                            // if (cellsNumbers[i][j] === 0) {
                            //     // reveal(i, j);
                            //     console.log(floodFillCounter);
                            //     // this.floodFill(i, j);
                            //     this.className = "known";
                            //     // minesweeper.floodFill(i, j);
                            // }
                            if (cellsNumbers[i][j] >= 1 && cellsNumbers[i][j] <= 8) {
                                this.className = "known";
                                for (let k = 1; k < 9; k++) {
                                    if (cellsNumbers[i][j] === k) {
                                        this.classList.add("number" + k);
                                        this.innerText = cellsNumbers[i][j];
                                    }
                                }
                            }
                            if (cellsNumbers[i][j] === -1) {
                                for (let k = 0; k < cells[i].length; k++) {
                                    for (let n = 0; n < cells[j].length; n++) {
                                        cells[k][n].className = "known";
                                        if (cellsNumbers[k][n] === -1) {
                                            cells[k][n].style.backgroundImage = "url(images/saper.png)"
                                        }
                                        for (let m = 1; m < 9; m++) {
                                            if (cellsNumbers[k][n] === m) {
                                                cells[k][n].classList.add("number" + m);
                                                cells[k][n].innerText = cellsNumbers[k][n];
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (e.button === 2) {
                            if (this.className === "unknown") {
                                if (this.innerText === "") {
                                    this.innerText = "🚩";
                                } else if (this.innerText === "🚩") {
                                    this.innerText = "?";
                                } else if (this.innerText === "?") {
                                    this.innerText = "";
                                }
                            }
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
                    if (cellsNumbers[i][j] !== -1)   //this.bodyOfCellsNumbers(i, j)
                        cellsNumbers[i][j] = this.checkNeighbours(i, j); //cellsNumbers[this.indexOfCells(i, j)]
                }
            }
            console.log(cellsNumbers);
            console.log(cells);
        }

        // bodyOfCells(x, y) {
        //     return cells[x + (y * this.boardColumns)]
        // }
        //
        // bodyOfCellsNumbers(x, y) {
        //     return cellsNumbers[x + (y * this.boardColumns)]
        // }
        //
        // indexOfCells(x, y) {
        //     return x + (y * this.boardColumns)
        // }

        checkNeighbours(x, y) {

            let mines = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardColumns && y + j >= 0 && y + j < this.boardRows) {
                        if (i !== 0 || j !== 0) {
                            if (cellsNumbers[x + i][y + j] === -1) { //this.bodyOfCellsNumbers(x + i, y + j)
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
                cellsNumbers[Math.floor(Math.random() * (cellsNumbers.length - 1))][Math.floor(Math.random() * (cellsNumbers.length - 1))] = -1;
            }
        };

        // floodFIll(x, y) {
        //     if (x < 0 && x >= this.boardColumns && y < 0 && y >= this.boardRows) {
        //         return false;
        //     }
        //     if (cellsNumbers[x][y] !== 0) {
        //         return false;
        //     }
        //     cells[x][y].className = "known";
        //     floodFill(x, y - 1);
        //     floodFill(x + 1, y - 1);
        //     floodFill(x + 1, y);
        //     floodFill(x + 1, y + 1);
        //     floodFill(x, y + 1);
        //     floodFill(x - 1, y + 1);
        //     floodFill(x - 1, y);
        //     floodFill(x - 1, y - 1);
        // }

        floodFill(x, y) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardColumns && y + j >= 0 && y + j < this.boardRows) {
                        if (cellsNumbers[x + i][y + j] !== -1 && cells[x + i][y + j].className !== "known") {
                            this.reveal(x + i, y + j);

                        }
                    }
                }
            }


        }

        //test     //static?
        reveal(x, y) {
            if (cellsNumbers[x][y] === 0) {
                cells[x][y].className = "known"
            }
            if (cellsNumbers[x][y] >= 1 && cellsNumbers[x][y] <= 8) {
                cells[x][y].className = "known";
                for (let i = 1; i < 9; i++) {
                    if (cellsNumbers[x][y] === i) {
                        cells[x][y].classList.add("number" + i);
                        cells[x][y].innerText = cellsNumbers[x][y];
                    }
                }
            }
            if (cellsNumbers[x][y] === -1) {
                for (let i = 0; i < cells[x].length; i++) {
                    for (let j = 0; j < cells[y].length; j++) {
                        cells[i][j].className = "known";
                        if (cellsNumbers[i][j] === -1) {
                            cells[i][j].style.backgroundImage = "url(images/saper.png)"
                        }
                        for (let k = 1; k < 9; k++) {
                            if (cellsNumbers[i][j] === k) {
                                cells[i][j].classList.add("number" + k);
                                cells[i][j].innerText = cellsNumbers[i][j];
                            }
                        }
                    }
                }
            }
            if (this.checkNeighbours(x, y) === 0) {
                floodFillCounter += 1;
                this.floodFill(x, y)
            }
        }


        helpFunctionToCheckEverything() {
            for (let i = 0; i < cells.length; i++) {
                cells[i].innerHTML = cellsNumbers[i]
            }
        }

    }

    const minesweeper = new Minesweeper(15, 15, 30);
    minesweeper.createBoard();
    minesweeper.createCellsNumbers();

    saperPicture.addEventListener("mousedown", function () {
        saperPicture.style.backgroundImage = "url(images/face_pressed.png)";
    });
    saperPicture.addEventListener("mouseup", () => {
        saperPicture.style.backgroundImage = "url(images/face_unpressed.png)";
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
    });

    // minesweeper.helpFunctionToCheckEverything();

    const menuEasy = document.querySelector(".easy");
    const menuMedium = document.querySelector(".medium");
    const menuHard = document.querySelector(".hard");
    const gameSubmenu = document.querySelector(".gameSubmenu");
    menuEasy.addEventListener("click", () => {
        this.minesweeper = null;
        const minesweeper = new Minesweeper(9, 9, 10);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
    });
    menuMedium.addEventListener("click", () => {
        this.minesweeper = null;
        const minesweeper = new Minesweeper(15, 15, 30);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
    });
    menuHard.addEventListener("click", () => {
        this.minesweeper = null;
        const minesweeper = new Minesweeper(20, 20, 99);
        minesweeper.clearBoard();
        minesweeper.createBoard();
        minesweeper.createCellsNumbers();
    })


});