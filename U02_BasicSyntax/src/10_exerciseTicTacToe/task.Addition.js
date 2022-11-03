//#region Exercise
import {startGame, cellClickHandler,resetClickHandler} from "./task.js";
import jsdom from "jsdom";
const dom = new jsdom.JSDOM(`<!DOCTYPE html><body><p id="fieldWrapper"></p></body>`);

export default class Exercise {
    constructor() {

        this.CROSS = 'X';
        this.ZERO = 'O';
        this.EMPTY = ' ';
        this.Field = null;
        this.CurrentSymbol = null;
        this.WinningSymbol = null;
        this.GameStatus = null;

        this.Dom = global.window ? document: dom.window.document
        this.container = this.Dom.getElementById('fieldWrapper')
        this.Field = this.createField();

        if (global == undefined || !global.window){
            alert = (str) => {
                this.GameStatus = str
            }
        }
    }
    creatingDocument(){
        var doc = dom.window.document
        document = doc
        return doc.getElementById('main')
    }
    startExercise() {
        this.renderGrid();
        this.CurrentSymbol = this.CROSS;
        this.WinningSymbol = null;
        this.addResetListener();
    }
    createField(field = [], dimension = 3){
        const result = [];
        for (let i = 0; i < dimension; i++) {
            result[i] = [];
            for (let j = 0; j < dimension; j++) {
                result[i][j] = field[i] && field[i][j] ? field[i][j] : this.EMPTY;
            }
        }
        return result;
    }
    getSymbolInCell (row, col) {
        return this.Field[row][col];
    }

    isSymbolWon(symbol, row, col, сells) {

        if (сells.length === 0) {
            return false;
        }
        for (const cell of сells) {
            if (cell.row === row && cell.col === col) {
                continue;
            }
            if (this.getSymbolInCell(cell.row, cell.col) !== symbol) {
                return false;
            }
        }
        return true;
    }


    renderGrid(dimension=3) {

        this.container.innerHTML = '';

        for (let i = 0; i < dimension; i++) {
            const row = this.Dom.createElement('tr');
            for (let j = 0; j < dimension; j++) {
                const cell = this.Dom.createElement('td');
                cell.textContent = this.EMPTY;
                cell.addEventListener('click', () => cellClickHandler(i, j));
                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    }

    setSymbolInCell(symbol, row, col, color = '#333') {
        this.Field[row][col] = symbol;
        this.renderSymbolInCell(symbol, row, col, color);
    }

    renderSymbolInCell(symbol, row, col, color = '#333') {
        const targetCell = this.findCell(row, col);
        targetCell.textContent = symbol;
        targetCell.style.color = color;
    }

    findCell(row, col) {
        const targetRow = this.container.querySelectorAll('tr')[row];
        return targetRow.querySelectorAll('td')[col];
    }

    addResetListener() {
        const resetButton = this.Dom.getElementById('reset');
        resetButton?.addEventListener('click', resetClickHandler);
    }

    clickOnCell (row, col) {
        this.findCell(row, col).click();
    }

    createingPrototypes(){
        if(global.window) {
            Window.prototype.CROSS = this.CROSS
            Window.prototype.ZERO = this.ZERO
            Window.prototype.EMPTY = this.EMPTY
            Window.prototype.CurrentSymbol = this.CurrentSymbol
            Window.prototype.WinningSymbol = this.WinningSymbol
            Window.prototype.setSymbolInCell = this.setSymbolInCell
            Window.prototype.isSymbolWon = this.isSymbolWon
            Window.prototype.clickOnCell = this.clickOnCell
            Window.prototype.Field = this.Field
        }
    }

}
//#endregion Exercise
