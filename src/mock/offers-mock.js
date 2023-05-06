import {getRandomArrayElement, getRandomInt} from '../utils';
import {POINTS_TYPE} from '../const';

const mockOffers = [
  {
    id: '1',
    name: 'level up',
    "type": getRandomArrayElement(POINTS_TYPE),
    price: getRandomInt(30)
  }
]

