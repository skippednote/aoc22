const fs = require('fs');

const [stacksRaw, movesRaw] = fs.readFileSync('./input', 'utf8').split('\n\n');

const stacks: string[] = stacksRaw.split('\n').slice(0, -1);
const moves: string[] = movesRaw.split('\n');

const parseLine = (line: string, stack: string[][]) => {
  let x = 0;
  let count = 0;

  while (x < line.length) {
    const v = line[x + 1];
    if (v !== ' ') {
      if (stack[count]) {
        stack[count].push(v);
      } else {
        stack[count] = [v];
      }
    }

    count += 1;
    x += 4;
  }

  return stack;
};

const generateStack = (stacks: string[]) =>
  stacks.reduce((stack: string[][], line) => {
    return parseLine(line, stack);
  }, []);

const parsedMoves = moves.flatMap((move) => {
  const moveRegex = /move (\d{1,2}) from (\d) to (\d)/g;
  return Array.from(move.matchAll(moveRegex)).map((i) => [
    Number(i[1]),
    Number(i[2]),
    Number(i[3]),
  ]);
});

const moveCrates = (moveMultiple = false): string[][] => {
  let stack = generateStack(stacks);
  parsedMoves.forEach(([cratesToMove, from, to]) => {
    let moving = stack[from - 1].splice(0, cratesToMove);
    if (!moveMultiple) {
      moving = moving.reverse();
    }
    stack[to - 1] = [...moving, ...stack[to - 1]];
  });
  return stack;
};

const generateTopStackString = (stack: string[][]) => {
  return stack.reduce((result, s) => {
    if (s[0]) {
      result += s[0];
    }
    return result;
  }, '');
};

export default {
  problem1: generateTopStackString(moveCrates()),
  problem2: generateTopStackString(moveCrates(true)),
};
