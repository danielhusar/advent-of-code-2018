const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const data = input.split('\n').filter(Boolean);

// Part 1
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

// Part 2
data.forEach((line, index) => {
  const currentLine = line.split('');
  const otherLines = data.slice(index + 1);

  otherLines.forEach(otherLine => {
    const lineToCompare = otherLine.split('');
    let differentCharacters = 0;
    let differentIndex;

    currentLine.forEach((_, index) => {
      if (currentLine[index] != lineToCompare[index]) {
        differentCharacters++;
        differentIndex = index;
      }
    });
    if (differentCharacters < 2) {
      const matchWithoutDifferentCharacter = line
        .split('')
        .map((letter, index) => {
          return index === differentIndex ? '' : letter;
        })
        .join('');

      console.log(matchWithoutDifferentCharacter);
    }
  });
});
