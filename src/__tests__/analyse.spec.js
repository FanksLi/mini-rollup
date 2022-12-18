const analyse = require('../analyse.js'),
acorn = require('acorn'),
magicString = require('magic-string');




function getCode(code) {
    const ast = acorn.parse(code, {
        location: true,
        ranges: true,
        sourceType: 'module',
        ecmaVersion: 7,
    });
    
    const m = new magicString(code);
    return {
        ast,
        magicString: m,
    }
}

describe("Test analyse", () => {
    test("Test analyse", () => {
        const ret = getCode('const a = 1');
        const {ast, magicString} = ret;
        analyse(ast, magicString);

        expect(ast._scope.contains('a')).toBe(true);
        expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope);
    });

    test("next", () => {
        const {ast, magicString} = getCode(
            `const a = '1';
            function fn(f1, f2) {
                const b = '2';
            }
            const c = '3';
            `
        );
        analyse(ast, magicString);
        expect(ast._scope.contains('a')).toBe(true);
        expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope);
        expect(ast.body[1]._scope.contains('b')).toBe(true);
        expect(ast.body[1]._scope.contains('f1')).toBe(true);
        expect(ast.body[1]._scope.contains('f2')).toBe(true);
        expect(ast.body[1]._scope.findDefiningScope('b')).toEqual(ast.body[1]._scope);
    });
    test("_dependsOn", () => {
        const {ast, magicString} = getCode(
            `const a = '1';
            function fn() {
                const b = '2';
            }
            const c = '3';
            `
        );
        analyse(ast, magicString);
        expect(ast.body[0]._dependsOn).toEqual({a: true});
        expect(ast.body[1]._dependsOn).toEqual({fn: true, b: true});

    });
})