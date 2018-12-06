const fs = require('fs');
const data = fs
  .readFileSync('./input.txt')
  .toString()
  .trim();

const start = Date.now();

const getValidPrevCharIndex = (input, index) => {
  while (!input[index - 1] && index >= 0) {
    index--;
  }
  if (index < 0) return;
  return index;
};

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

      // This takes actually longer lol
      // const prevCharIndex = getValidPrevCharIndex(input, index);
      // if (prevCharIndex == null) return char;
      // const prevChar = input[prevCharIndex];

      // if (prevChar && char !== prevChar && char.toLowerCase() === prevChar.toLowerCase()) {
      //   hasDuplicates = true;
      //   input[prevCharIndex] = undefined;
      //   return;
      // }

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

const benchmark = Math.round((Date.now() - start) / 1000);
console.log(`Took: ${benchmark} seconds`);
