const fs = require('fs');
const path = require('path');

const acorn = require('acorn');
const magicString = require('magic-string');



const code = fs.readFileSync('./src/main.js', 'utf-8').toString();


const ast = acorn.parse(code, {
    location: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7,
});


const m = new magicString(code);

const mStr = m.snip(0, 19).toString();

const declarations = {};
const statements = [];

// // 分析部分
// ast.body.forEach(node => {
//     function initNode(n) {
//         const {type} = n;
//         if(type === 'VariableDeclaration') {
//             declarations[node.declarations[0].id.name] = n;
//         } else if(type === 'FunctionDeclaration') {
//             declarations[node.id.name] = n;
//         }
//     }
//    initNode(node);
//     // declarations[node.declarations[0].id.name] = node;
// })

// // 展开部分
// ast.body
// .filter(node => node.type !== 'VariableDeclaration')
// .forEach(node => {
// console.log(node);
//     statements.push(declarations[node.expression.callee.name]);
//     statements.push(node);
// });
// console.log(mStr);

// // 到处部分output
// let str = '';
// statements.forEach(node => {
//     str += m.snip(node.start, node.end).toString() + '\n';
// })
// console.log(declarations);
// console.log(statements);
console.log(m.toString());