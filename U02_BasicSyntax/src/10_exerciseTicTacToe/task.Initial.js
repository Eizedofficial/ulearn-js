import Exercise from './task.Addition.js'

export let exercise;

export function startGame(){
    exercise = new Exercise()
    exercise.createingPrototypes()
    exercise.startExercise()
    exercise.Field = []
}

export function resetClickHandler() {
    startGame()
}



//#region Exercise
export function cellClickHandler (row, col) {
    // Пиши код тут

    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    setTimeout(()=>{
        //Данная функция нужна для смены текущего Игрока
        // и последующего хода компьютера, если игра ещё не окончилась
    })
}

export function makeAiTurn (aiSymbol) {
    //...
    // использовать setSymbolInCell()
    // console.log(`AI has done turn`);
    setTimeout(()=>{
        // Не забудьте поменять пользователя, если игра не окончилась
        //...
    })

}

export function handleEndOfGame (pretenderSymbol, pretenderCell) {
    //pretenderSymbol - символ текущего игрока
    //pretenderCell - текущее поле, на которое сходили.
    // Вы должны проверить, приводит ли текущий символ к победе. Для этого вам понадобиться собсвтенная вспомогательная функция
    //getWinningCellsAfterSymbol
    // Если символ привел к победе, воспользуйтесь функцией handleWin и верните true
    // сли символ приводит к Ничье, воспользуйтесь функцией handleDraw и также верните true
    // Иначе - верните false.
    return false
}

export function getWinningCellsAfterSymbol (symbol, row, col) {
    const colCells = [];
    const rowCells = [];
    const diagonal1Cells = [];
    const diagonal2Cells = [];
   // здесь вам поможет функция из класса exercise - isSymbolWon, которая свопадает ли переданный символ в поле cells
    return null;
}

export function handleWin (pretenderSymbol, winningCells) {


}
export function handleDraw (pretenderSymbol, winningCells) {

}

export function switchPlayer () {
    // exercise.CurrentSymbol  = ...
}



export function hasEmptyCells (field = this.field) {
    return getEmptyCells(field).length > 0
}

export function getEmptyCells (field = this.field) {
    //exercise.getSymbolInCell...
    return []
}
//#endregion Exercise
