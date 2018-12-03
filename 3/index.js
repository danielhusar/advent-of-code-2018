const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const data = input.split('\n').filter(Boolean);

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

const map = {};
const setMap = (x, y, id) => {
  const key = `${x}-${y}`;
  const keyExists = map[key];
  map[key] = map[key] || [];
  map[key].push(id);
  return keyExists ? map[key] : false;
};

const mapID = {};
data.forEach(row => {
  let { id, x, y, width, height } = parseRow(row);
  let uniq = true;
  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      const overlap = setMap(x + i, y + j, id);
      if (!overlap && uniq) {
        uniq = true;
      } else {
        if (overlap) overlap.forEach(id => (mapID[id] = false));
        uniq = false;
      }
    }
  }

  if (uniq) mapID[id] = true;
});

let squaresMoreThanOnce = 0;
Object.keys(map).forEach(key => {
  if (map[key].length > 1) squaresMoreThanOnce++;
});

let uniqId = Object.keys(mapID).find(key => mapID[key]);
console.log(squaresMoreThanOnce, uniqId);
