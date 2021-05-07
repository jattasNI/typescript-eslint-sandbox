const world = 'world';
enum MyEnum { Foo = 'foo', Bar = 'bar'}

export function hello(word: MyEnum): string {
    switch (word) {
        case MyEnum.Bar:
            console.log('fall');
            return 'stuff';
        case MyEnum.Foo:
            console.log('hello');
            return 'hello';
    }
    return 'x';
}

export class MyClass {
    foo: string;
    /**
     *
     */
    constructor() {
        this.foo = 'hi';
    }
}