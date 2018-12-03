const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const data = input.split('\n').filter(Boolean);

const map = {};

const parseRow = row => {
  const [id, rest] = row.split('@');
  const [coords, size] = rest.split(':');
  const [x, y] = coords.split(',');
  const [width, height] = size.split('x');
  return {
    id: id.trim(),
    x: Number(x.trim()),
    y: Number(y.trim()),
    width: Number(width.trim()),
    height: Number(height.trim()),
  };
};

const setMap = (x, y, id) => {
  const key = `${x}-${y}`;
  map[key] = map[key] ? map[key] + 1 : 1;
};

data.forEach(row => {
  let { id, x, y, width, height } = parseRow(row);
  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      setMap(x + i, y + j, id);
    }
  }
});

let occurrences = 0;
Object.keys(map).forEach(key => {
  if (map[key] > 1) {
    ++occurrences;
  }
});

console.log(occurrences);
