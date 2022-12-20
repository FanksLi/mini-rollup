const rollup = require('../rollup');

const entry = './src/dome/index.js';
console.log(entry);
rollup(entry, 'bundle.js');