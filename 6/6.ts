const fs = require('fs');
const input: string = fs.readFileSync('./input', 'utf8');

const findMarker = (markerSize = 4) => {
  let index = 0;
  let markerIndex = undefined;

  while (index < input.length) {
    let characters = new Set([...input.slice(index, index + markerSize)]);
    if (characters.size === markerSize) {
      markerIndex = index + markerSize;
      break;
    }
    index += 1;
  }

  return markerIndex;
};

export default {
  problem1: findMarker(),
  problem2: findMarker(14),
};
