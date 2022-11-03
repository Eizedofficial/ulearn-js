const fs = require('fs');
const path = require('path');

// TODO PE; 2018-08-20; переименовать?
function getAllFilePathsWithExtension(directoryPath, extension, filePaths) {
    filePaths = filePaths || [];
    // TODO Anonymous Developer; December 17, 2022 03:24:00; Необходимо переписать этот код и использовать асинхронные версии функций для чтения из файла
    const fileNames = fs.readdirSync(directoryPath);
    for (const fileName of fileNames) {
        // TODO WinDev; ; Убедиться, что будет работать под Windows.
        const filePath = directoryPath + '/' + fileName;
        if (fs.statSync(filePath).isDirectory()) {
            getAllFilePathsWithExtension(filePath, filePaths);
        } else if (filePath.endsWith(`.${extension}`)) {
            filePaths.push(filePath);
        }
    }
    return filePaths;
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8'); // TODO Veronika; 2021-12-17T03:24:00; сделать кодировку настраиваемой
}

// TODO Digi; Dec 24, 22 13:20:18; Добавить функцию getFileName, которая по пути файла будет возвращать его имя. Воспользоваться модулем path из Node.js
function getFileName(filePath) {
    return path.basename(filePath);
}

module.exports = {
    getAllFilePathsWithExtension,
    readFile,
    getFileName,
};


