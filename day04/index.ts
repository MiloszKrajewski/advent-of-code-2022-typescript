import { assert } from "console";
import _, { map } from "lodash";
import tap from "tap";

import { subtest } from "../tools/TapLike";
import { fail, loadLines } from "../tools/tools";

subtest(tap, "day04", (t) => {
    subtest(t, "example 1", (t) => {
        const data = loadInput("day04/input0.txt");
        const count = solve1(data);
        t.equal(count, 2, "there 2 such sections");
    });

    subtest(t, "solution 1", (t) => {
        const data = loadInput("day04/input1.txt");
        const count = solve1(data);
        t.pass("there are " + count + " such sections");
    });

    subtest(t, "example 1", (t) => {
        const data = loadInput("day04/input0.txt");
        const count = solve2(data);
        t.equal(count, 4, "there 4 such sections");
    });

    subtest(t, "solution 2", (t) => {
        const data = loadInput("day04/input1.txt");
        const count = solve2(data);
        t.pass("there are " + count + " such sections");
    });
});

type Range = { a: number, b: number}

function loadInput(filename: string): [Range, Range][] {
    return loadLines(filename).map(line => parsePair(line));
}

function parsePair(line: string) {
    const [x, y] = line.split(",");
    return [parseRange(x), parseRange(y)] as [Range, Range];
}

function parseRange(s: string): Range {
    const [a, b] = s.split("-").map(x => parseInt(x));
    return { a, b };
}

function solve1(data: [Range, Range][]) {
    return data.filter(([a, b]) => inside2(a, b)).length;
}

function solve2(data: [Range, Range][]) {
    return data.filter(([a, b]) => overlap(a, b)).length;
}

function overlap(a: Range, b: Range) {
    return a.b >= b.a && a.a <= b.b;
}

function between(a: number, b: Range) {
    return a >= b.a && a <= b.b;
}

function inside(a: Range, b: Range) {
    return between(a.a, b) && between(a.b, b);
}

function inside2(a: Range, b: Range) {
    return inside(a, b) || inside(b, a);
}
