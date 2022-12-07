const fs = require('fs');

const inputs: string[] = fs.readFileSync('./input', 'utf8').split('\n');

const tokenizer = (inputs: string[]) => {
  return inputs.map((input) => {
    const components = input.trim().split(' ');
    switch (true) {
      case components[0] === '$' && components[1] === 'cd':
        return {
          type: 'cmd',
          cmd: 'cd',
          arg: components[2],
        };
      case components[0] === '$' && components[1] === 'ls':
        return {
          type: 'cmd',
          cmd: 'ls',
        };
      case /^\d/.test(components[0]):
        return {
          type: 'file',
          name: components[1],
          size: Number(components[0]),
        };
      case /^dir/.test(components[0]):
        return {
          type: 'dir',
          name: components[1],
        };
    }
  });
};

const generateDirectoryTree = (tokens: any) => {
  const path: string[] = [];
  const tree: { [key: string]: number } = {};

  for (const token of tokens) {
    if (token.type === 'cmd') {
      if (token.cmd === 'ls') {
        continue;
      }
      if (token.arg === '..') {
        path.pop();
      } else {
        path.push(token.arg);
      }
    } else if (token.type === 'dir') {
      continue;
    } else {
      path.forEach((_, i) => {
        const pathSlice = path.slice(0, i + 1).join('/');
        tree[pathSlice] = tree[pathSlice]
          ? (tree[pathSlice] += token.size)
          : token.size;
      });
    }
  }
  return tree;
};

const directoryTree = generateDirectoryTree(tokenizer(inputs));

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
