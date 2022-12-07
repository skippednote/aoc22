const fs = require('fs');

const inputs: string[] = fs.readFileSync('./input', 'utf8').split('\n');
let path: string[] = [];
const directoryTree: { [key: string]: number } = {};

for (const i of inputs) {
  const tokens = i.trim().split(' ');
  if (tokens[1] === 'cd') {
    if (tokens[2] === '..') {
      path.pop();
    } else {
      path.push(tokens[2]);
    }
  } else if (tokens[1] === 'ls' || tokens[1] === 'dir') {
    continue;
  } else {
    if (/^\d/.test(i)) {
      path.forEach((_, i) => {
        const size = Number(tokens[0]);
        const pathSlice = path.slice(0, i + 1).join('/');

        directoryTree[pathSlice] = directoryTree[pathSlice]
          ? directoryTree[pathSlice] + size
          : size;
      });
    }
  }
}

const directoriesLargerThanHundredThousand = () =>
  Object.values(directoryTree)
    .filter((v) => v <= 100000)
    .reduce((acc, i) => {
      acc += i;
      return acc;
    }, 0);

const calculateSpaceNeedToRunUpdate = () => {
  const totalSpace = 70000000;
  const spaceRequiredForUpdate = 30000000;

  const maxSpaceThatCanBeUsed = totalSpace - spaceRequiredForUpdate;
  const additionalSpaceNeeded = directoryTree['/'] - maxSpaceThatCanBeUsed;

  const directoriesLargerThatCanBeDeleted = Object.values(directoryTree).filter(
    (v) => v >= additionalSpaceNeeded
  );
  return Math.min(...directoriesLargerThatCanBeDeleted);
};

export default {
  problem1: directoriesLargerThanHundredThousand(),
  problem2: calculateSpaceNeedToRunUpdate(),
};
