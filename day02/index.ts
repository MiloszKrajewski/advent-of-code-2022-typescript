import _ from "lodash";
import tap from "tap";

import { subtest } from "../tools/TapLike";
import { fail, loadLines } from "../tools/tools";

subtest(tap, "day02", (t) => {
    subtest(t, "example 1", (t) => {
        const data = _([...loadInput("day02/input0.txt")]);
        const result = data.sumBy(([his, mine]) => points(his, mine));
        t.equal(result, 15, "total number is 15");
    });

    subtest(t, "part 1", (t) => {
        const data = _([...loadInput("day02/input1.txt")]);
        const result = data.sumBy(([his, mine]) => points(his, mine));
        t.pass("total number is " + result);
    });

    subtest(t, "example 2", (t) => {
        const data = _([...loadInput("day02/input0.txt")]);
        const result = data.sumBy(([his, outcome]) => points(his, findMove(his, outcome)));
        t.equal(result, 12, "total number is 12");
    });

    subtest(t, "part 2", (t) => {
        const data = _([...loadInput("day02/input1.txt")]);
        const result = data.sumBy(([his, outcome]) => points(his, findMove(his, outcome)));
        t.pass("total number is " + result);
    });
});

function* loadInput(filename: string) {
    const lines = loadLines(filename);
    for (let line of lines) {
        const [h, m] = line.split(" ");
        yield [parseSymbol(h), parseSymbol(m)];
    }
}

function parseSymbol(symbol: string): number {
    return (
        symbol == "A" || symbol == "X" ? 1 :
        symbol == "B" || symbol == "Y" ? 2 :
        symbol == "C" || symbol == "Z" ? 3 :
        fail<number>("Invalid symbol: " + symbol)
    );
}

function points(his: number, mine: number) {
    return mine + (isDraw(his, mine) ? 3 : 0) + (isWin(his, mine) ? 6 : 0);
}

function wrap(code: number) {
    return code < 1 ? code + 3 : code > 3 ? code - 3 : code;
}

function isDraw(his: number, mine: number) {
    return his == mine;
}

function isWin(his: number, mine: number) {
    // 1 - rock, 2 - paper, 3 - scissors
    return his == wrap(mine - 1);
}

function findMove(his: number, outcome: number) {
    // 1 - rock, 2 - paper, 3 - scissors
    // 1 - lose, 2 - draw, 3 - win

    return (
        outcome == 3 ? wrap(his + 1) :
        outcome == 1 ? wrap(his - 1) :
        his
    );
}
