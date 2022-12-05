const fs = require('fs');

const inputs: string[] = fs.readFileSync('./input', 'utf8').split('\n');

const convertStringToRangeStringPair = (input: string): string[] => {
  return input.split(',');
};
const convertStringToRangeNumber = (rangeString: string): number[] => {
  return rangeString.split('-').map(Number);
};

const generateRange = ([start, end]: number[]) => {
  return Array(end + 1 - start)
    .fill(0)
    .map((_, index) => start + index);
};

const checkOverlaps = (
  firstRange: number[],
  secondRange: number[],
  checkPartial = false
): boolean => {
  if (checkPartial) {
    return (
      firstRange.some((i) => secondRange.includes(i)) ||
      secondRange.some((i) => firstRange.includes(i))
    );
  }
  return (
    firstRange.every((i) => secondRange.includes(i)) ||
    secondRange.every((i) => firstRange.includes(i))
  );
};

const solution = (checkPartial = false): number => {
  return inputs.reduce((acc, input) => {
    const rangeStringPairs = convertStringToRangeStringPair(input);
    const [firstRange, secondRange] = rangeStringPairs
      .map(convertStringToRangeNumber)
      .map(generateRange);

    let overlaps = checkOverlaps(firstRange, secondRange, checkPartial);
    overlaps ? (acc += 1) : acc;
    return acc;
  }, 0);
};

export default {
  problem1: solution(),
  problem2: solution(true),
};
