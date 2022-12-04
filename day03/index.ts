import { assert } from "console";
import _, { map } from "lodash";
import tap from "tap";

import { subtest } from "../tools/TapLike";
import { fail, loadLines } from "../tools/tools";

subtest(tap, "day03", (t) => {
    subtest(t, "example 1", (t) => {
        const sum = solve1("day03/input0.txt");
        t.equal(sum, 157, "sum matches expected value of 157");
    });

    subtest(t, "solution 1", (t) => {
        const sum = solve1("day03/input1.txt");
        t.pass("sum of priorities is: " + sum);
    });

    subtest(t, "example 2", (t) => {
        const filename = "day03/input0.txt";
        const sum = solve2(filename);
        t.equal(70, sum, "sum matches expected value of 70");
    });

    subtest(t, "solution 2", (t) => {
        const filename = "day03/input1.txt";
        const sum = solve2(filename);
        t.pass("sum of priorities is: " + sum);
    });
});

function solve1(filename: string) {
    return _(loadLines(filename)).map(splitLine).sumBy(([a, b]) => scoreText(intersection(a, b)));
}

function solve2(filename: string) {
    const groups = [...groupIn3(loadLines(filename))];
    return _(groups).map(g => intersectionN(g)).sumBy(s => scoreText(s));
}

function intersection(a: string, b: string): string {
    return _.intersection(a.split(""), b.split("")).join("");
}

function intersectionN(sets: string[]) {
    return sets.slice(1).reduce((a, b) => intersection(a, b), sets[0]);
}

function* loadInput(filename: string) {
    return loadLines(filename).map(s => splitLine(s));
}

function splitLine(line: string) {
    const length = line.length;
    assert(length % 2 == 0, "length must be even");
    const setA = line.substring(0, length / 2);
    const setB = line.substring(length / 2);
    return [setA, setB] as [string, string];
}

function scoreChar(c: string) {
    assert(c.length == 1);
    if (c >= 'a' && c <= 'z') {
        return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else if (c >= 'A' && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    return fail<number>(`Invalid character ${c}`);
}

function scoreText(s: string) {
    return _(s.split("")).sumBy(c => scoreChar(c));
}

function* groupIn3(lines: string[]) {
    const length = lines.length;
    assert(length % 3 == 0, "length must be divisible by 3");
    let i = 0;
    while (i < length) {
        const a = lines[i++];
        const b = lines[i++];
        const c = lines[i++];
        yield [a, b, c] as [string, string, string];
    }
}