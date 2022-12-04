import fs from 'fs';

export type Derived<T> = T & Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
export const noop = (..._: any[]) => { };

export const strcmp = (a: string, b: string, ignoreCase = false): number =>
	ignoreCase ? strcmp(a.toLowerCase(), b.toLowerCase(), false) : a == b ? 0 : a > b ? 1 : -1;
export const streq = (a: string, b: string, ignoreCase = false): boolean => strcmp(a, b, ignoreCase) == 0;

export const isFunction = (obj: any): obj is () => any => obj && typeof obj === 'function';
export const isPromise = (obj: any): obj is Promise<any> => obj && isFunction(obj.then);
export const isArray = (obj: any): obj is any[] => obj && Array.isArray(obj);
export const isString = (obj: any): obj is string => obj && typeof obj === 'string';
export const isObject = (obj: any): obj is Record<string, any> => obj && typeof obj === 'object';
export const isNumber = (obj: any): obj is number => obj !== null && obj !== undefined && typeof obj === 'number';
export const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;
export const fail = <T>(message: string): T => { throw new Error(message); };

export const loadText = (path: string): string => fs.readFileSync(path, 'utf8');
export const loadLines = (path: string): string[] => loadText(path).split(/\r?\n/);

export function* dfs<N, K>(node: N, identity: (node: N) => K, children: (node: N) => N[]) {
	const stack: N[] = [node];
	const visited = new Set<K>();
	while (stack.length > 0) {
		const node = stack.pop()!;
		const key = identity(node);
		if (visited.has(key)) continue;
		visited.add(key);
		yield node;
		stack.push(...[...children(node)].reverse());
	}
}

export function* bfs<N, K>(node: N, identity: (node: N) => K, children: (node: N) => N[]) {
	const queue: N[] = [node];
	const visited = new Set<K>();
	while (queue.length > 0) {
		const node = queue.shift()!;
		const key = identity(node);
		if (visited.has(key)) continue;
		visited.add(key);
		yield node;
		queue.push(...children(node));
	}
}