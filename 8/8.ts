const fs = require("fs");
const inputs: string[] = fs.readFileSync("./input", "utf8").split("\n");
const grid = inputs.map((line) => line.trim().split("").map(Number));

const getAfter = (
  i: number,
  j: number,
  current: number
): [boolean, number[]] => {
  const surroundings = [];
  for (let x = j; x < grid[i].length - 1; x++) {
    surroundings.push(grid[i][x + 1]);
  }
  return [Math.max(...surroundings) < current, surroundings];
};

const getBefore = (
  i: number,
  j: number,
  current: number
): [boolean, number[]] => {
  const surroundings = [];
  for (let x = 0; x < j; x++) {
    surroundings.push(grid[i][x]);
  }
  return [Math.max(...surroundings) < current, surroundings];
};

const getAbove = (
  i: number,
  j: number,
  current: number
): [boolean, number[]] => {
  const surroundings = [];
  for (let x = 0; x < i; x++) {
    surroundings.push(grid[x][j]);
  }
  return [Math.max(...surroundings) < current, surroundings];
};

const getBelow = (
  i: number,
  j: number,
  current: number
): [boolean, number[]] => {
  const surroundings = [];
  for (let x = i + 1; x < grid.length; x++) {
    surroundings.push(grid[x][j]);
  }
  return [Math.max(...surroundings) < current, surroundings];
};
const findUntil = (input: number[], current: number, reverse = false) => {
  let found = false;
  const ts = [];
  if (reverse) {
    input = input.reverse();
  }
  for (let tree of input) {
    if (!found) {
      ts.push(tree);

      if (tree >= current) {
        found = true;
      }
    }
  }
  return ts.length;
};

const getScenicScore = (
  current: number,
  afterTrees: number[],
  beforeTrees: number[],
  aboveTrees: number[],
  belowTrees: number[]
) => {
  let afterBlockedBy = findUntil(afterTrees, current);
  let beforeBlockedBy = findUntil(beforeTrees, current, true);
  let aboveBlockedBy = findUntil(aboveTrees, current, true);
  let belowBlockedBy = findUntil(belowTrees, current);

  return [
    afterBlockedBy,
    beforeBlockedBy,
    aboveBlockedBy,
    belowBlockedBy,
  ].reduce((acc, tree) => (acc *= tree));
};

let totalVisibleTrees = 0;
let scenicScores: number[] = [];
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (
      i === 0 ||
      i === grid.length - 1 ||
      j === 0 ||
      j === grid[i].length - 1
    ) {
      totalVisibleTrees += 1;
    } else {
      const current = grid[i][j];
      let [afterVisible, afterTrees] = getAfter(i, j, current);
      let [beforeVisible, beforeTrees] = getBefore(i, j, current);
      let [aboveVisible, aboveTrees] = getAbove(i, j, current);
      let [belowVisible, belowTrees] = getBelow(i, j, current);

      if (afterVisible || beforeVisible || aboveVisible || belowVisible) {
        totalVisibleTrees += 1;

        scenicScores.push(
          getScenicScore(
            current,
            afterTrees,
            beforeTrees,
            aboveTrees,
            belowTrees
          )
        );
      }
    }
  }
}

export default {
  problem1: totalVisibleTrees,
  problem2: Math.max(...scenicScores),
};
