
/** возвращает случайный элемент массива*/
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/** возвращает случайное число от min (включительно) до(не включительно) max */
function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/** принимает массив и элемент.
 * Проходит по массиву, ища в нем элемент с таким же id.
 * Если находит - заменяет updatom этот элемент */
function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export {
  getRandomArrayElement,
  getRandomInt,
  updateItem,
};
