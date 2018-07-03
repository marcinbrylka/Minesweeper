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
        this.nickInput = document.querySelector("input");
        this.ok = document.querySelector(".ok");
        this.cancel = document.querySelector(".cancel");
    }
}


export {Selectors};