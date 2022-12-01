import _ from "lodash";
import tap from "tap";

import { subtest } from "../tools/TapLike";
import { loadLines } from "../tools/tools";

subtest(tap, "day01", (t) => {
    subtest(t, "example - top 1", t => {
        const [maxGroup, maxValue] = findTop1("day01/input0.txt");
        t.equal(maxGroup, 4, "4th elf...");
        t.equal(maxValue, 24000, "...has 24k calories");
    });

    subtest(t, "example - top 3", t => {
        const top3sum = findTop3("day01/input0.txt");
        t.equal(45000, top3sum, "...top 3 have 45k calories");
    });

    subtest(t, "input1 - top 1", t => {
        const [maxGroup, maxValue] = findTop1("day01/input1.txt");
        t.pass("group: " + maxGroup);
        t.pass("value: " + maxValue);
    });

    subtest(t, "input1 - top 3", t => {
        const top3sum = findTop3("day01/input1.txt");
        t.pass("sum: " + top3sum);
    });
});

function findTop1(filename: string) {
    return _([...loadInput(filename)]).maxBy(([_, value]) => value)!;
}

function findTop3(filename: string) {
    return _([...loadInput(filename)]).sortBy(([_, value]) => -value).take(3).sumBy(([_, value]) => value);
}

function loadInput(filename: string) {
    const lines = loadLines(filename);

    let group = 1;
    let stats = new Map<number, number>();
    for (const line of lines) {
        if (line == "") {
            group++;
        } else {
            const value = parseInt(line);
            stats.set(group, (stats.get(group) ?? 0) + value);
        }
    };
    return stats;
}
