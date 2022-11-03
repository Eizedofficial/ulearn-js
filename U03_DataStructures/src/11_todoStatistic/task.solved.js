
const {getAllFilePathsWithExtension, readFile, getFileName} = require('./fileSystem');
const {readLine} = require('./console');
const {path} = require('path')

const TODO_PREFIX = '\/\/ TODO ';

const handlerFromCommand = {
    'exit': handleExit,
    'show': handleShow,
    'important': handleImportant,
    'user': handleUser,
    'sort': handleSort,
    'date': handleDate,
};


const files = getFiles();

console.log('Please, write your command!');
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

function handleExit() {
    process.exit(0);
}

function handleShow() {
    return showTodos(readAllTodos());
}

function handleImportant() {
    return showTodos(readAllTodos()
        .filter(todo => todo.importance > 0));
}

function handleUser(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return 'wrong arguments';
    }
    const user = args[0].trim().toUpperCase();
    return showTodos(readAllTodos()
        .filter(todo => todo.user && todo.user.toUpperCase() === user));
}

function handleSort(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return 'wrong arguments';
    }

    const compare = getCompare(args[0].trim());
    if (!compare) {
        console.log('wrong arguments');
        return 'wrong arguments';
    }

    return showTodos(readAllTodos().sort(compare));
}

function handleDate(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return 'wrong arguments';
    }

    const minDate = new Date(args[0]);
    if (isNaN(minDate.getTime())) {
        console.log('wrong arguments');
        return 'wrong arguments';
    }
    return showTodos(readAllTodos())
        .filter(todo => new Date(todo.date) >= new Date(minDate));
}

function readAllTodos() {
    const todos = [];
    for (const file of files) {
        for (const line of file.content.split('\n')) {
            const todoIndex = line.indexOf(TODO_PREFIX);
            if (todoIndex >= 0) {
                const todoString = line.substr(todoIndex + TODO_PREFIX.length);
                const todo = parseTodo(file.name, todoString);
                todos.push(todo);
            }
        }
    }
    return todos;
}

function parseTodo(fileName, todoString) {
    const parts = todoString.split(';');

    let user = '';
    let date = null;
    let comment = '';
    if (parts.length >= 3) {
        user = parts[0].trim();
        const datePart = parts[1].trim();
        if (datePart.length > 0) {
            date = formatDate(new Date(datePart));
        }
        comment = parts.slice(2).join(';').trim();
    } else if (parts.length === 2) {
        user = parts[0].trim();
        comment = parts.slice(1).join(';').trim();
    } else {
        comment = parts[0].trim();
    }
    const importance = getImportance(comment);

    return {importance, user, date, comment, fileName};
}

function getImportance(comment) {
    if (!comment.includes('!'))
        return 0;

    let result = 0;
    for (let i = 0; i < comment.length; i++) {
        if (comment[i] === '!') {
            result++;
        }
    }
    return result;
}

function showTodos(todos) {

    console.log(todos)
    return todos

}




function formatDate(date) {
    if (typeof date === typeof new Date() ) {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    return 'Без даты'
}

function getCompare(compareName) {
    switch (compareName) {
        case 'importance':
            return (a, b) => compareNumbersDescending(a.importance, b.importance);
        case 'user':
            return (a, b) => compareStrings(a.user, b.user);
        case 'date':
            return (a, b) => compareDatesDescending(new Date(a.date), new Date(b.date));
    }
    return null;
}

function compareStrings(a, b) {
    if (!a && !b) {
        return 0;
    }
    if (!a) {
        return 1;
    }
    if (!b) {
        return -1;
    }
    return a.toUpperCase().localeCompare(b.toUpperCase());
}

function compareDatesDescending(a, b) {
    if (!a && !b) {
        return 0;
    }
    if (!a) {
        return 1;
    }
    if (!b) {
        return -1;
    }
    return compareNumbersDescending(a.getTime(), b.getTime());
}

function compareNumbersDescending(a, b) {
    return a === b ? 0 : b - a;
}



module.exports ={
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

