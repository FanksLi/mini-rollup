const Bundle = require('../bundle');
const fs = require('fs');
jest.mock('fs');

describe('bundle Test', () => {
    test('fetchModule', () => {
        const bundle = new Bundle({ entry: './a.js'});
        fs.readFileSync.mockReturnValueOnce(`const a = 1;`);
       const module = bundle.fetchModule('index.js');
        const {calls} = fs.readFileSync.mock;
        expect(calls[0][0]).toEqual('index.js');
        expect(module.code.toString()).toEqual('const a = 1;');
    });

    describe('build', () => {
        test('单条语句', () => {
            const bundle = new Bundle({ entry: './a.js'});
            fs.readFileSync.mockReturnValueOnce(`console.log(1);`);
            bundle.build('bundle.js');
            const {calls} = fs.writeFileSync.mock;
            
            expect(calls[0][0]).toEqual('bundle.js');
            expect(calls[0][1]).toEqual('console.log(1);');
        });

        test('多条语句', () => {
            const bundle = new Bundle({ entry: './a.js'});
            fs.readFileSync.mockReturnValueOnce(`const a = () => 1;
            const b = () => 2;
            a();`);
            fs.writeFileSync.mock.calls = [];
            bundle.build('bundle.js');
            const {calls} = fs.writeFileSync.mock;
            
            expect(calls[0][0]).toEqual('bundle.js');
            expect(calls[0][1]).toEqual(`const a = () => 1;
a();`);
        });
        test('多模块语句', () => {
            const bundle = new Bundle({ entry: 'index.js'});
            fs.readFileSync.mockReturnValueOnce(`import {a} from './a';
a();`).mockReturnValueOnce('export const a = () => 1;');
            fs.writeFileSync.mock.calls = [];
            bundle.build('bundle.js');
            const {calls} = fs.writeFileSync.mock;
            
            expect(calls[0][0]).toEqual('bundle.js');
            expect(calls[0][1]).toEqual(`const a = () => 1;
a();`);
        });
    });
});