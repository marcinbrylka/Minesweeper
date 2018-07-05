import '../scss/main.scss';
class Selectors {
    constructor() {
        this.mS = document.querySelector(".minesCounter .mS");
        this.mD = document.querySelector(".minesCounter .mD");
        this.mJ = document.querySelector(".minesCounter .mJ");
        this.tS = document.querySelector(".timer .tS");
        this.tD = document.querySelector(".timer .tD");
        this.tJ = document.querySelector(".timer .tJ");
        this.saperPicture = document.querySelector(".saperPicture");
        this.main = document.querySelector(".mainContainer");
        this.board = document.querySelector(".boardContainer");
        this.info = document.querySelector(".informationContainer");
        this.menu = document.querySelector(".menuContainer");
        this.winFormBackground = document.querySelector(".winFormBackground");
        this.winTime = document.querySelector(".winTime");
        this.ok = document.querySelector(".ok");
        this.cancel = document.querySelector(".cancel");
        this.easyTable = document.querySelector(".dataEasyTable");
        this.mediumTable = document.querySelector(".dataMediumTable");
        this.hardTable = document.querySelector(".dataHardTable");
    }
}


export {Selectors};