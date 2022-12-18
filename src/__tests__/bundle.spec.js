const Bundle = require('../bundle');
const fs = require('fs');
jest.mock('fs');

describe('bundle Test', () => {
    test('fetchModule', () => {
        const bundle = new Bundle({ entry: './a.js'});
        fs.readFileSync.mockReturnValueOnce(`const a = 1;`);
        bundle.fetchModule('index.js');
        const {calls} = fs.readFileSync.mock;
        
        console.log(calls);
        expect(calls[0][0]).toEqual('index.js');
    });
});