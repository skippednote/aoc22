const fs = require('fs');

function generateAlphabets(casing: 'upper' | 'lower' = 'upper'): {
  [key: string]: number;
} {
  const startingCharCode = casing === 'upper' ? 65 : 97;
  const charProp = casing === 'upper' ? 26 : 0;
  return [...Array(26)].reduce((acc, _, index) => {
    const char = String.fromCharCode(startingCharCode + index);
    acc[char] = index + 1 + charProp;
    return acc;
  }, {});
}

const alphabetScore = {
  ...generateAlphabets('lower'),
  ...generateAlphabets('upper'),
};

function generateHash(input: string) {
  return input
    .split('')
    .reduce((hash: { [key: string]: number }, char: string) => {
      if (hash[char]) {
        hash[char] += 1;
      } else {
        hash[char] = 1;
      }
      return hash;
    }, {});
}

function intersection(
  a: { [key: string]: number },
  b: { [key: string]: number },
  c?: { [key: string]: number }
) {
  for (let i in a) {
    if (c) {
      if (c && b[i] && c[i]) {
        return i;
      }
    } else if (b[i]) {
      return i;
    }
  }
}

function splitStringInHalf(input: string): [string, string] {
  const { length } = input;
  const half = length / 2;
  return [input.slice(0, half), input.slice(half)];
}

const inputs: string[] = fs.readFileSync('./input', 'utf8').split('\n');

function solution1() {
  let total = 0;
  inputs.forEach((input) => {
    const [first, second] = splitStringInHalf(input);
    const unique = intersection(generateHash(first), generateHash(second));
    if (unique) {
      total += alphabetScore[unique];
    }
  });
  return total;
}

function solution2() {
  let total = 0;
  for (let i = 0; i < inputs.length; i += 3) {
    const unique = intersection(
      generateHash(inputs[i]),
      generateHash(inputs[i + 1]),
      generateHash(inputs[i + 2])
    );
    if (unique) {
      total += alphabetScore[unique];
    }
  }

  return total;
}

export default {
  part1: solution1(),
  part2: solution2(),
};
