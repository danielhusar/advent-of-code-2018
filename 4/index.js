const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const data = input.split('\n').filter(Boolean);

const getDate = input => new Date(input.match(/\[(.*?)\]/)[1]);
const getId = input => {
  const id = input.match(/#(\d+)/);
  if (!id) return null;
  return Number(id[1]);
};
const sortedData = data.sort((a, b) => getDate(a) - getDate(b));

let lastId;
const mapById = {};
sortedData.forEach(line => {
  const id = getId(line);
  if (!id) {
    mapById[lastId] = mapById[lastId] || [];
    mapById[lastId].push(line);
  } else {
    lastId = id;
  }
});

let sleepTime;
const mapByIdWithTime = {};
Object.keys(mapById).forEach(key => {
  const guard = mapById[key];
  guard.forEach(line => {
    if (line.match(/asleep/)) {
      sleepTime = getDate(line);
    } else {
      const mins = (getDate(line) - sleepTime) / 1000 / 60;
      mapByIdWithTime[key] = (mapByIdWithTime[key] || 0) + mins;
    }
  });
});
const guardThatSleepsTheMost = Object.keys(mapById).sort((a, b) => mapByIdWithTime[b] - mapByIdWithTime[a])[0];

sleepTime = null;
const minutesMap = {};
const getMin = input => Number(input.match(/00:(\d+)\]/)[1]);
mapById[guardThatSleepsTheMost].forEach(line => {
  if (line.match(/asleep/)) {
    sleepTime = getMin(line);
  } else {
    const wakeTime = getMin(line);
    for (i = sleepTime; i < wakeTime; i++) {
      minutesMap[i] = (minutesMap[i] || 0) + 1;
    }
  }
});

const minutesMapSorted = Object.keys(minutesMap).sort((a, b) => minutesMap[b] - minutesMap[a]);
console.log(guardThatSleepsTheMost, minutesMapSorted[0], guardThatSleepsTheMost * minutesMapSorted[0]);
