const fs = require("fs");
const inputs: Input[] = fs.readFileSync("./input", "utf8").split("\n");

type Directions = keyof typeof moves;
type Input = `${Directions} ${number}`;

const moves = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

const generateGrid = () =>
  inputs
    .map((line: Input) => line.split(" "))
    .map(
      ([direction, steps]) =>
        ({
          direction,
          steps: Number(steps),
        } as { direction: Directions; steps: number })
    );

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Directions) {
    const delta = moves[direction];
    this.x += delta.x;
    this.y += delta.y;
  }

  follow(point: Point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );

    if (distance > 1) {
      const directionX = point.x - this.x;
      const directionY = point.y - this.y;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

function markVisited(x: number, y: number, visited: Set<string>) {
  visited.add(`${x}-${y}`);
}

function solution1() {
  const grid = generateGrid();
  let visited = new Set<string>();
  let head = new Point(0, 0);
  let tail = new Point(0, 0);
  markVisited(0, 0, visited);

  for (let line of grid) {
    for (let i = 0; i < line.steps; i++) {
      head.move(line.direction);
      tail.follow(head);
      markVisited(tail.x, tail.y, visited);
    }
  }

  return visited.size;
}

function solution2() {
  const grid = generateGrid();
  let visited = new Set<string>();
  let knots = Array(10)
    .fill(0)
    .map((_) => new Point(0, 0));
  markVisited(0, 0, visited);

  for (let line of grid) {
    for (let i = 0; i < line.steps; i++) {
      knots[0].move(line.direction);
      for (let knot = 1; knot < knots.length; knot++) {
        knots[knot].follow(knots[knot - 1]);
      }
      const tail = knots[knots.length - 1];
      markVisited(tail.x, tail.y, visited);
    }
  }

  return visited.size;
}

export default {
  problem1: solution1,
  problem2: solution2,
};
