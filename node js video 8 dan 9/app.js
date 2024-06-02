const validator = require('validator');

const chalk = require('chalk');

// console.log(validator.isEmail('syauqi@gmail.c'));
// console.log(validator.isMobilePhone('08123456789', 'id-ID'));
// console.log(validator.isNumeric('08123456789'));

// console.log(chalk.italic.bgBlue.black('Hello World!'));
const nama = 'syauqi';
const pesan = chalk`Lorem, ipsum dolor {bgRed.black.bold sit amet} consectetur
{bgGreen.italic.black adipisicing} elite. Nama saya : ${nama}`;
console.log(pesan);
