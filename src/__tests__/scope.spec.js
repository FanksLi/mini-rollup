const Scope = require('../scope.js');


describe("Test Scope", () => {
    // test('基础功能', () => {
    //     // const a = 1;
    //     // function f() {
    //     //     const b = 2;
    //     // }

    //     const root = new Scope();

    //     root.add('a');

    //     const child = new Scope({parent: root});

    //     child.add('b');

    //     expect(child.contains('a')).toBe(true);
    //     expect(child.contains('b')).toBe(true);
    //     expect(child.findDefiningScope('a')).toBe(root);
    //     expect(child.findDefiningScope('b')).toBe(child);
    // });

    test('跨层级功能', () => {
        // const a = 1;
        // function f() {
        //     const b = 2;
        //  function f2() {
        //     const c = 3;
        //  }
        // }

        const root = new Scope();

        root.add('a');

        const child = new Scope({parent: root});

        child.add('b');
        const grandChild = new Scope({parent: child});
        grandChild.add('c');

        expect(grandChild.contains('a')).toBe(true);
        expect(grandChild.contains('b')).toBe(true);
        expect(grandChild.contains('c')).toBe(true);
        expect(grandChild.findDefiningScope('a')).toBe(root);
        expect(grandChild.findDefiningScope('b')).toBe(child);
        expect(grandChild.findDefiningScope('c')).toBe(grandChild);
    });
});