const world = 'world';
enum MyEnum { Foo = 'foo', Bar = 'bar', Baz = 'baz'}

export function returnsAllCasesWithDefault(option: MyEnum): string {
    switch (option) {
        case MyEnum.Foo:
            return 'ok';
        case MyEnum.Bar:
            return 'stuff';
        case MyEnum.Baz:
            return 'great';
        default:
            // default-case forces this un-necessary default
            throw Error('unexpected value');
    }
}

export function returnsAllCasesWithoutDefault(option: MyEnum): string {
    switch (option) {
        case MyEnum.Foo:
            return 'ok';
        case MyEnum.Bar:
            return 'stuff';
        case MyEnum.Baz:
            return 'great';
    }
    // even if we turn off default-case, consistent-return forces us to add unreachable code
    throw Error('unexpected value');
}

export function handlesAllCases(option: MyEnum): string {
    let result = 'hi';
    switch (option) {
        case MyEnum.Foo:
            result = 'ok';
            break;
        case MyEnum.Bar:
            result = 'stuff';
            break;
        case MyEnum.Baz:
            result = 'great';
            break;
        // we could turn off default-case to avoid an unnecessary default
    }
    // and in this situation consistent-return wouldn't error because we always provide a value for 'result'
    // but if we didn't initialize it, tsc would error: Function lacks ending return statement and return type does not include 'undefined'.
    return result;
}

export function forgotACaseReturn(option: MyEnum): string {
    switch (option) {
        case MyEnum.Foo:
            return 'ok';
        case MyEnum.Bar:
            return 'stuff';
        // switch-exhaustiveness-check catches that we don't handle every case
        // consistent-return catches that we don't return from all code paths
        // default-case catches that we don't have a default
        // tsc does too: Function lacks ending return statement and return type does not include 'undefined'
    }
}

// this example proves the value of switch-exhaustiveness-check
export function forgotACaseSet(option: MyEnum): string {
    let result = 'hi';
    switch (option) {
        case MyEnum.Foo:
            result = 'ok';
            break;
        case MyEnum.Bar:
            result = 'stuff';
            break;
        // switch-exhaustiveness-check catches that we don't handle every case
        // even though tsc says this case is fine
        // default-case would catch this too
    }
    return result;
}

export function intentionallyDontHandleCases(option: MyEnum): string {
    let result = 'hi';
    switch (option) {
        case MyEnum.Foo:
            result = 'ok';
            break;
        default:
            // intentionally have a default case. lint and build report no errors
            break;
    }
    return result;
}

export function compilerCanTellWeHandleAllCases(option: 'abc' | 'def'): string {
    let result;
    switch (option) {
        case 'abc':
            result = 'ok';
            break;
        case 'def':
            result = 'good';
            break;
        // default-case wants an unnecessary default case
    }
    return result;
}

export function compilerCanTellWeDontHandleAllCases(option: 'abc' | 'def'): string {
    let result;
    switch (option) {
        case 'abc':
            result = 'ok';
            break;
        // default-case wants a default case
        // switch-exhaustiveness-check can detect this too
    }
    // tsc: string|undefined is not assignable to type string
    return result;
}

export function compilerCantTell(option: string): string {
    let result = 'init';
    switch (option) {
        case 'abc':
            result = 'ok';
            break;
        // default-case wants a case here which would be good for signalling developer intent
        // switch-exhaustiveness can't detect this
    }
    return result;
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