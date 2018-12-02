const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const data = input.split('\n').filter(Boolean);

let two = 0;
let three = 0;

data.forEach(d => {
  let hasTwo = false;
  let hasThree = false;
  const map = {};
  d.split('').forEach(letter => {
    map[letter] ? (map[letter] = map[letter] + 1) : (map[letter] = 1);
  });

  Object.keys(map).forEach(key => {
    if (map[key] === 2) hasTwo = true;
    if (map[key] === 3) hasThree = true;
  });

  if (hasTwo) two++;
  if (hasThree) three++;
});

console.log(two, three, two * three);
