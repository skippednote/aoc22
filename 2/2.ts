const fs = require('fs');

type ValueOf<O> = O[keyof O];
type Shape = ValueOf<typeof opponent>;
type Rules<O extends string> = `${O}-${O}`;
type Input = [keyof typeof opponent, keyof typeof me];

const opponent = {
  A: 'rock',
  B: 'paper',
  C: 'scissor',
} as const;

const me = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissor',
} as const;

const scores = {
  rock: 1,
  paper: 2,
  scissor: 3,
} as const;

const strategy = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
} as const;

const rules = {
  'rock-scissor': 'rock',
  'scissor-rock': 'rock',
  'paper-scissor': 'scissor',
  'scissor-paper': 'scissor',
  'paper-rock': 'paper',
  'rock-paper': 'paper',
  'paper-paper': 'paper',
  'rock-rock': 'rock',
  'scissor-scissor': 'scissor',
} as const;

const mapping = {
  paper: {
    win: 'scissor',
    lose: 'rock',
    draw: 'paper',
  },
  rock: {
    win: 'paper',
    lose: 'scissor',
    draw: 'rock',
  },
  scissor: {
    win: 'rock',
    lose: 'paper',
    draw: 'scissor',
  },
} as const;

class CalculateScore {
  opp?: Shape;
  my?: Shape;
  total: number;

  constructor() {
    this.total = 0;
  }

  calculate(oppChoice: Shape, myChoice: Shape) {
    const ruleString: Rules<Shape> = `${oppChoice}-${myChoice}`;
    const winner = rules[ruleString];

    let score = 0;
    if (oppChoice === myChoice) {
      score += 3;
    } else if (myChoice === winner) {
      score += 6;
    }
    score += scores[myChoice];
    this.total += score;
  }
}

const inputs = fs.readFileSync('./input', 'utf8').split('\n');
let myScore = new CalculateScore();
let influencedScore = new CalculateScore();

for (let input of inputs) {
  const [a, b]: Input = input.split(' ');
  const condition = strategy[b];
  const oppChoice = opponent[a];
  const myChoice = me[b];
  const influencedChoice = mapping[oppChoice][condition];
  myScore.calculate(oppChoice, myChoice);
  influencedScore.calculate(oppChoice, influencedChoice);
}

export default {
  part1: myScore.total,
  part2: influencedScore.total,
};
