// common core modules
const os = require('os');
const path = require('path');

console.log('Operating System:', os.type());
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('Version:', os.version());

console.log(path.parse(__filename));

// importing custom module w/o destructuring
const math = require('./math');
console.log(math.add(1,2))

// importing custom module with destructuring
const { add, subtract, multiply, divide } = require('./math');
console.log('Add:', add(5, 3));