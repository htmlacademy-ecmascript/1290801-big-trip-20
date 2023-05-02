import {getRandomArrayElement} from '../utils';
import {POINTS_TYPE} from '../const';

const mockPoints = [
  {
    "basePrice": 1100,
    "dateFrom": "2019-07-10T22:55:56.845Z",
    "dateTo": "2019-07-11T11:22:13.375Z",
    "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
    "isFavorite": false,
    "offers": [
      "some offer one",
      "some offer two"
    ],
    "type": getRandomArrayElement(POINTS_TYPE)
  },
  {
    "basePrice": 100,
    "dateFrom": "2019-07-10T22:55:56.845Z",
    "dateTo": "2019-07-11T11:22:13.375Z",
    "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
    "isFavorite": false,
    "offers": [
      "some offer one",
      "some offer two"
    ],
    "type": getRandomArrayElement(POINTS_TYPE)
  },
  {
    "basePrice": 6799,
    "dateFrom": "2019-07-11T22:55:56.845Z",
    "dateTo": "2019-07-12T11:22:13.375Z",
    "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
    "isFavorite": true,
    "offers": [
      "some offer one",
      "some offer two"
    ],
    "type": getRandomArrayElement(POINTS_TYPE)
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};

// From server:
// {
//   "id": "f4b62099-293f-4c3d-a702-94eec4a2808c",
//   "base_price": 1100,
//   "date_from": "2019-07-10T22:55:56.845Z",
//   "date_to": "2019-07-11T11:22:13.375Z",
//   "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
//   "is_favorite": false,
//   "offers": [
//   "b4c3e4e6-9053-42ce-b747-e281314baa31"
// ],
//   "type": "taxi"
// }
