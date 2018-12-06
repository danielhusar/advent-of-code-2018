const fs = require('fs');
const data = fs
  .readFileSync('./input.txt')
  .toString()
  .trim();

// Speed improvement: remove undefined on the go and check also previous character
let hasDuplicates;
const removePolymers = input => {
  hasDuplicates = false;
  return input
    .map((char, index) => {
      if (!char) return;
      const nextChar = input[index + 1];
      if (!nextChar) return char;

      if (char !== nextChar && char.toLowerCase() === nextChar.toLowerCase()) {
        hasDuplicates = true;
        input[index + 1] = undefined;
        return;
      }

      return char;
    })
    .filter(Boolean);
};

const getShortestPolymer = data => {
  let removedPolymers = removePolymers(data.split(''));
  while (hasDuplicates) {
    removedPolymers = removePolymers(removedPolymers);
  }
  return removedPolymers;
};
console.log(getShortestPolymer(data).length);

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetMap = {};
alphabet.forEach(char => {
  alphabetMap[char] = getShortestPolymer(data.replace(new RegExp(char, 'gi'), '')).length;
});

const alphabetMapSorted = Object.keys(alphabetMap).sort((a, b) => alphabetMap[a] - alphabetMap[b]);
console.log(alphabetMapSorted[0], alphabetMap[alphabetMapSorted[0]]);
