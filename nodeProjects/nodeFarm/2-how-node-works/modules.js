// console.log(arguments);                         //arguements is the array in js
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1')
const calc1 = new C();
console.log(calc1.add(2,5));

// exports
const calc2 = require("./test-module-2");
console.log(calc2.multiply(2,7));