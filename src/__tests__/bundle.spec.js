const Bundle = require('../bundle');
const fs = require('fs');

jest.mock('fs');
describe('bundle Test', () => {
    test('test fetchModule', () => {
        const bundle = new Bundle({entry: './a.js'});
        // 制造一个返回值
        fs.readFileSync.mockReturnValueOnce('const a = 1;');
        const module = bundle.fetchModule('index.js');
        const calls = fs.readFileSync.mock.calls;

        expect(calls[0][0]).toEqual('index.js');
        // MagicString对象
        const str = module.code.toString();
        expect(str).toEqual('const a = 1;');
    });

    // test('test fetchModule path', () => {
    //     const bundle = new Bundle({entry: './a.js'});
    //     // 制造一个返回值
    //     fs.readFileSync.mockReturnValueOnce('const a = 1;');
    //     // a.js引用了b.js
    //     const module = bundle.fetchModule('./b.js', '/c/a.js');
    //     const calls = fs.readFileSync.mock.calls;

    //     // MagicString对象
    //     const str = module.code.toString();
    //     expect(str).toEqual('const a = 1;');
    //     expect(calls[0][0]).toEqual('/c/b.js');

    // });
    test('test build', () => {
        const bundle = new Bundle({entry: './a.js'});
        fs.readFileSync.mockReturnValueOnce('console.log(1);');
        let calls = fs.readFileSync.mock.calls;

        bundle.build('bundle.js');
        fs.writeFileSync('bundle.js', 'const a = 1;');
        calls = fs.writeFileSync.mock.calls;

        expect(calls[0][0]).toBe('bundle.js');
        expect(calls[0][1]).toBe('console.log(1);');
    });
});