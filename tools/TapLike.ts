import { isFunction, isPromise } from './tools';

export interface TestLike {
	ok(obj: any, message?: string): boolean;
	pass(message?: string /*extra?: Options.Assert*/): boolean;
	fail(message?: string /*extra?: Options.Assert*/): boolean;
	test<T>(name: string, action: (t: T) => void): void;
	end(): any;
}

export function subtest<T extends TestLike, R>(t: T, name: string, action: (t: T) => R): R {
	let result: any;
	t.test<T>(`${name} > `, (t) => {
		result = action(t);
		t.end();
	});
	return result;
}
