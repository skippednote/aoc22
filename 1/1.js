const fs = require("fs");
const input = fs.readFileSync("./input", "utf8");

const calories = input
  .split("\n\n")
  .map((line) => line.split("\n"))
  .map((i) => i.reduce((acc, i) => (acc += Number(i)), 0));

const highestCalories = Math.max(...calories);
const totalOfTopThreeCalories = calories
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, i) => (acc += i));

console.log({ highestCalories, totalOfTopThreeCalories });
