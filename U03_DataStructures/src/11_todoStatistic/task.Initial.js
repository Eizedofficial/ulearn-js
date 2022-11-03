const {getAllFilePathsWithExtension, readFile, getFileName} = require('./fileSystem');
const {readLine} = require('./console');

const handlerFromCommand = {
    'exit': handleExit,
    'show': handleShow,
    'important': handleImportant,
    'user': handleUser,
    'sort': handleSort,
    'date': handleDate,
};
const TODO_PREFIX = '\/\/ TODO ';
const files = getFiles();

console.log('Please, write your command!');
console.log(files);
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => {
        return {name: getFileName(path), content: readFile(path)}
    });
}

function processCommand(commandLine) {
    const [command, ...args] = commandLine.split(' ');
    const handler = handlerFromCommand[command];
    if (handler) {
        handler(args);
    } else {
        console.log('wrong command');
    }
}
function handleExit(){
    process.exit(0)
}
function handleShow(){

}
function handleImportant(){

}
function handleUser(args){

}
function handleSort(args){

}
function handleDate(args){

}
function getImportance(comment){
    let result = 0

    return result
}
function readAllTodos(){

}
function parseTodo(fileName,todoString){
    let user = ''
    let date = null;
    let comment = '';
    let importance = 0
    return {importance,user,date,comment,fileName}
}

function formatDate(date){

}
//#region Task
/*
    Вставь функции
    handleShow,
    handleImportant,
    handleUser,
    handleSort,
    handleDate,
    getImportance,
    readAllTodos,
    parseTodo,
    formatDate,
    а также доп. функции, которые ты напишешь, и которые будут необходимы для работы

*/
//#endregion Task

module.exports = {
    files,
    readAllTodos,
    getImportance,
    parseTodo,
    handleExit,
    handleShow,
    handleUser,
    handleImportant,
    handleSort,
    handleDate,
    formatDate
}

