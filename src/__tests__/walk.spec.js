
describe('ast walk function', () => {
    test('单个节点', () => {
        const walk = require('../walk');
        const ast = {
            a: '1'
        }
        // walk();
        const mockEnter = jest.fn();
        const mockLeave = jest.fn();
        // expect(walk(ast, null, mockEnter, mockLeave)).toBe('fan');
        walk(ast, null, mockEnter, mockLeave);

        let calls = mockEnter.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toEqual({a: '1'});

        calls = mockLeave.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toEqual({a: '1'});

    });
})