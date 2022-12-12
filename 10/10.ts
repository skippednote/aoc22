const fs = require("fs");
const inputs: string[] = fs.readFileSync("./input", "utf8").split("\n");
const cycleIndex = [20, 60, 100, 140, 180, 220];

const solution1 = inputs
  .reduce(
    (acc, line) => {
      let [cmd, amt] = line.split(" ");
      let amtInt = Number(amt);
      if (cmd === "noop") {
        acc.cycles += 1;
        if (cycleIndex.includes(acc.cycles)) {
          acc.store.push(acc.total * acc.cycles);
        }
        return acc;
      } else if (cmd === "addx") {
        for (let i = 0; i < 2; i++) {
          acc.cycles += 1;
          if (cycleIndex.includes(acc.cycles)) {
            acc.store.push(acc.total * acc.cycles);
          }
          if (i === 1) {
            acc.total += amtInt;
          }
        }
      }
      return acc;
    },
    <{ cycles: number; total: number; store: number[] }>{
      cycles: 0,
      total: 1,
      store: [],
    }
  )
  .store.reduce((acc, i) => (acc += i), 0);

const solution2 = inputs
  .map((line) => {
    return line.split(" ");
  })
  .reduce(
    (acc, [cmd, amt]) => {
      let amtI = Number(amt);
      if (cmd === "addx") {
        acc.values.push(acc.t);
        acc.values.push(acc.t);
        acc.t += amtI;
      } else {
        acc.values.push(acc.t);
      }
      return acc;
    },
    <{ t: number; values: number[] }>{ t: 1, values: [] }
  )
  .values.reduce((acc, v, i) => {
    let xp = i % 40;
    if (v === xp || v === xp - 1 || v === xp + 1) {
      acc += "#";
    } else {
      acc += ".";
    }
    if (xp === 39) {
      acc += "\n";
    }
    return acc;
  }, "");

export default {
  problem1: solution1,
  problem2: solution2,
};
