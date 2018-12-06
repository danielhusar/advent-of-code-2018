const fs = require('fs');
const data = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('');

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

let removedPolymers = removePolymers(data);
while (hasDuplicates) {
  removedPolymers = removePolymers(removedPolymers);
}

console.log(removedPolymers.length);
