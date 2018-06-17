import '../scss/main.scss';

document.addEventListener("DOMContentLoaded", function () {

    const board = document.querySelector(".boardContainer > div");
    let cells = [];
    let cellsNumbers = [];
    let numberOfCells;

    class Minesweeper {
        constructor(boardColumns, boardRows, numberOfMines) {
            this.boardColumns = boardColumns;
            this.boardRows = boardRows;
            this.numberOfMines = numberOfMines;
        }

        createBoard() {
            board.style.width = this.boardRows * 50 + "px";
            board.style.height = this.boardColumns * 50 + "px";
            numberOfCells = this.boardRows * this.boardColumns;
            for (let i = 0; i < numberOfCells; i++) {
                const newCell = document.createElement("div");
                newCell.classList.add("unknown");
                board.appendChild(newCell);
                cells.push(newCell);
            }

            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener("contextmenu", function (e) {
                    e.preventDefault();
                });

                cells[i].addEventListener("mousedown", function (e) {
                    if (e.button === 0) {
                        if (this.innerText !== "🚩" && this.innerText !== "?") {
                            this.className = "known"
                        }
                    }
                });

                cells[i].addEventListener("mouseup", function (e) {
                    if (e.button === 0) {
                        if ((cellsNumbers[i] === 0 || this.innerText === "?") && this.innerText !== "🚩") {
                            this.className = "known";
                        } else if (cellsNumbers[i] >= 1 && cellsNumbers[i] <= 8) {
                            this.className = "known";
                            this.innerText = cellsNumbers[i]
                        } else if (cellsNumbers[i] === -1) {
                            for (let j = 0; j < cells.length; j++) {
                                cells[j].className = "known";
                                if (cellsNumbers[j] !== 0) {
                                    cells[j].innerText = cellsNumbers[j]
                                }
                            }
                        }
                    }
                    if (e.button === 2) {
                        if (this.className === "unknown") {
                            this.innerText = "🚩";
                            if (this.innerText === "🚩") {

                            }
                        }
                    }
                });


            }

        }

        createCellsNumbers() {
            for (let i = 0; i < numberOfCells; i++) {
                cellsNumbers.push("");
            }
            this.generateMines();

            for (let i = 0; i < this.boardRows; i++) {
                for (let j = 0; j < this.boardColumns; j++) {
                    if (this.bodyOfCellsNumbers(i, j) !== -1)
                        cellsNumbers[this.indexOfCellsNumbers(i, j)] = this.checkNeighbours(i, j);
                }
            }
            console.log(cellsNumbers);
        }

        index(x, y) {
            return cells[x + (y * this.boardColumns)]
        }

        bodyOfCellsNumbers(x, y) {
            return cellsNumbers[x + (y * this.boardColumns)]
        }

        indexOfCellsNumbers(x, y) {
            return x + (y * this.boardColumns)
        }

        checkNeighbours(x, y) {

            let mines = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i >= 0 && x + i < this.boardColumns && y + j >= 0 && y + j < this.boardRows) {
                        if (i !== 0 || j !== 0) {
                            if (this.bodyOfCellsNumbers(x + i, y + j) === -1) {
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
                cellsNumbers[Math.floor(Math.random() * (cellsNumbers.length - 1))] = -1;
            }

        };

        helpFunctionToCheckEverything() {
            for (let i = 0; i < cells.length; i++) {
                cells[i].innerHTML = cellsNumbers[i]
            }
        }

    }

    const minesweeper = new Minesweeper(9, 9, 10);
    minesweeper.createBoard();
    minesweeper.createCellsNumbers();
    // minesweeper.helpFunctionToCheckEverything();
});