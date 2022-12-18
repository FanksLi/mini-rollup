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

const tree = {index: 0};

function getCode(body) {
    const children = [];
    body.forEach(node => {
        const {type, declarations, body: child} = node;
        let data = {};
        if(type === 'VariableDeclaration') {
            data = {
                type: declarations[0].id.type,
                value: declarations[0].id.name,
            }
        children.push(data);
           
        } else if(type === 'FunctionDeclaration') {
            data = {
                type: 'function',
                value: node.id.name,
            }
        children.push(data);

        }
        if(child) {
            data.children = getCode(child.body);
        }
    })
    return children;
}
tree.children = getCode(ast.body);

let chunk = '';
function output(t) {
    let space = '';
    const num = t.index;
    for(let n = 0; n < num; n++) {
        space += '  ';
    }
    if(t.type) {
        chunk += `${space}${t.type}: ${t.value} \n`;
    }
    if(t.children && t.children.length) {
        t.children.forEach(child => {
            child.index = t.index + 1;
            output(child);
        })
    }
}
output(tree)
console.log(chunk);