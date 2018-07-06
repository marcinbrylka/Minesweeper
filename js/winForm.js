import {Selectors} from "./selectors.js"

let nick = "";
let time = "";
let playerEasy = [];
let playerMedium = [];
let playerHard = [];

class WinForm {
    constructor() {
        this.selectors = new Selectors();

    }

    showWinForm(difficult) {
        time = this.selectors.tS.innerHTML + "" + this.selectors.tD.innerHTML + "" + this.selectors.tJ.innerHTML + "s";
        let nickSave = false;
        const nickReg = new RegExp('^[0-9a-zA-Z]+$');

        this.selectors.winFormBackground.style.display = "flex";
        this.selectors.winFormBackground.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        this.selectors.winTime.innerText = "you won in " + time;
        this.selectors.ok.addEventListener("click", (e) => {
            if (nickSave === false) {
                e.preventDefault();
                if (document.form.nick.value.length === 0) {
                    alert("Field can not be empty");
                } else if (!nickReg.test(document.form.nick.value)) {
                    alert("Use only letters and numbers");
                } else {
                    nickSave = true;
                    nick = document.form.nick.value;
                    this.selectors.winFormBackground.style.display = "none";
                    let newPlayer = [nick, time];
                    this.updateRankingTable(newPlayer, difficult);
                }
            }
        });
        this.selectors.cancel.addEventListener("click", (e) => {
            e.preventDefault();
            nickSave = true;
            this.selectors.winFormBackground.style.display = "none";
        });
    };

    updateRankingTable(newPlayer, difficult) {
        let player = [];
        if (difficult === "easy") {

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    player.push(this.selectors.easyTable.children[0].children[i].children[j].innerHTML);
                }
                playerEasy.push(player);
                player = [];
            }
            playerEasy.push(newPlayer);
            playerEasy.sort(function (a, b) {
                if (isNaN(parseInt(a[1], 10)))
                    return 1;
                if (isNaN(parseInt(b[1], 10)))
                    return -1;
                if (parseInt(a[1], 10) === parseInt(b[1], 10))
                    return 0;
                if (parseInt(a[1], 10) < parseInt(b[1], 10))
                    return -1;
                else
                    return 1;
            });
            if (playerEasy.length > 10) {
                playerEasy.pop();
            }
            console.log(playerEasy);

            localStorage.setItem("arrayEasy", JSON.stringify(playerEasy));

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    this.selectors.easyTable.children[0].children[i].children[j].innerHTML = playerEasy[i][j - 1];
                }
            }
            playerEasy = [];

        } else if (difficult === "medium") {

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    player.push(this.selectors.mediumTable.children[0].children[i].children[j].innerHTML);
                }
                playerMedium.push(player);
                player = [];
            }
            playerMedium.push(newPlayer);
            playerMedium.sort(function (a, b) {
                if (isNaN(parseInt(a[1], 10)))
                    return 1;
                if (isNaN(parseInt(b[1], 10)))
                    return -1;
                if (parseInt(a[1], 10) === parseInt(b[1], 10))
                    return 0;
                if (parseInt(a[1], 10) < parseInt(b[1], 10))
                    return -1;
                else
                    return 1;
            });
            if (playerMedium.length > 10) {
                playerMedium.pop();
            }
            console.log(playerMedium);

            localStorage.setItem("arrayMedium", JSON.stringify(playerMedium));

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    this.selectors.mediumTable.children[0].children[i].children[j].innerHTML = playerMedium[i][j - 1];
                }
            }
            playerMedium = [];

        } else if (difficult === "hard") {

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    player.push(this.selectors.hardTable.children[0].children[i].children[j].innerHTML);
                }
                playerHard.push(player);
                player = [];
            }
            playerHard.push(newPlayer);
            playerHard.sort(function (a, b) {
                if (isNaN(parseInt(a[1], 10)))
                    return 1;
                if (isNaN(parseInt(b[1], 10)))
                    return -1;
                if (parseInt(a[1], 10) === parseInt(b[1], 10))
                    return 0;
                if (parseInt(a[1], 10) < parseInt(b[1], 10))
                    return -1;
                else
                    return 1;
            });
            if (playerHard.length > 10) {
                playerHard.pop();
            }
            console.log(playerHard);

            localStorage.setItem("arrayHard", JSON.stringify(playerEasy));

            for (let i = 0; i < 10; i++) {
                for (let j = 1; j < 3; j++) {
                    this.selectors.hardTable.children[0].children[i].children[j].innerHTML = playerHard[i][j - 1];
                }
            }
            playerHard = [];

        }

    }

}

export {WinForm};