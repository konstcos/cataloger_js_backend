/**
 * Выполнение консольных скриптов
 */
require('module-alias/register');
const fs = require('fs');
const path = require('path');

// сканируем папки
const consoleFolderPath = path.join(__dirname, 'src', 'console');
const scriptFiles = fs.readdirSync(consoleFolderPath).filter(file => file.endsWith('.js'));

/**
 * Получение команд с сомандной строки
 * @type {string|null}
 */
const userCommand = process.argv[2];

/**
 * Получение команд с сомандной строки
 * @type {string[]}
 */
const params = process.argv.slice(3);

/**
 * список всех консольных скриптов
 * @type {{}}
 */
const consoleScripts = {};

scriptFiles.forEach(file => {
    const script = require(path.join(consoleFolderPath, file));
    consoleScripts[script.command] = new script();
});

if (Object.keys(consoleScripts).length === 0) {
    console.log('\nНа даный момент в системе нет ни одного скрипта, \nс начала их нужно создать в папке src/console \n')
} else if (!userCommand) {
    console.log('\nДоступные комнды:')
    for (const command in consoleScripts) {
        console.log(`- ${command}`);
    }
    console.log('\n');
} else if (!consoleScripts[userCommand]) {
    console.log('\nТакой комнды нет \n');
} else {
    console.log('\n');
    consoleScripts[userCommand].run(...params);
    console.log('\n');
}

