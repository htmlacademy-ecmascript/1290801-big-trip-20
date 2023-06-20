/** возвращает случайное число от min (включительно) до(не включительно) max */
function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export {
  getRandomInt,
};
