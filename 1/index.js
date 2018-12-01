const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const calculate = (input, initialFrequency) => {
  const frequencies = [];
  let iterations = 0;
  let nonUniqFrequency = null;

  const getSum = initialFrequency =>
    input
      .split('\n')
      .map(Number)
      .filter(Boolean)
      .reduce(reducer, initialFrequency);

  const reducer = (accumulator, currentValue) => {
    if (!nonUniqFrequency) {
      frequencies.includes(accumulator) ? (nonUniqFrequency = accumulator) : frequencies.push(accumulator);
    }
    return accumulator + currentValue;
  };

  let firstIteration = (iteration = getSum(0));
  while (nonUniqFrequency == null) {
    iteration = getSum(iteration);
    iterations++;
  }

  return [firstIteration, nonUniqFrequency, iterations];
};

const start = Date.now();
const results = calculate(input, 0);
const benchmark = Math.round((Date.now() - start) / 1000);

console.log(results[0], results[1]);
console.log(`Tests pass: ${results[0] === 578 && results[1] === 82516}`);
console.log(`Took: ${benchmark} seconds and ${results[2]} iterations`);
