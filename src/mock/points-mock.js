import {
  getRandomArrayElement,
  getRandomInt
} from '../utils/common';
import {MOCK_POINT_COUNT, POINTS_TYPE} from '../const';
import {getOffers} from './offers-mock';
import {getRandomTime} from '../utils/time';

// const pointDestination = ['Moscow', 'Texas', 'London', 'Tokyo', 'New-York'];
const pointDestination = ['b8bbe9a6-9fde-4713-930b-8105ed8decbb', '0ac9df44-6b6d-4233-8d29-3e227a3e470f', '115c1f07-f50e-4811-8b30-6e386023d457', '1ad0d08f-7172-4c3b-9fa1-5da21ea95bb2', '8e1901ba-1e26-43fa-b740-95a8286ce345'];

function getRandomPointMock() {
  const offersCol = getRandomInt(3);
  const type = getRandomArrayElement(POINTS_TYPE);
  const offersThisType = getOffers(type).offers;
  const dateFrom = getRandomTime();
  const dateTo = getRandomTime(dateFrom);
  const offers = [];
  for (let i = 0; i < offersCol; i++){
    offers.push(getRandomArrayElement(offersThisType).id);
  }

  const mockPoint = {
    'id': crypto.randomUUID(),
    'basePrice': getRandomInt(3000),
    'dateFrom': dateFrom,
    'dateTo': dateTo,
    'destination': getRandomArrayElement(pointDestination),
    'isFavorite': !!getRandomInt(2),
    'offers': offers,
    'type': type
  };
  return mockPoint;
}

function getRandomPointsMock() {
  return Array.from({length: MOCK_POINT_COUNT}, getRandomPointMock);
}

export {getRandomPointMock, getRandomPointsMock};

// From server:
// {
//   'id': 'f4b62099-293f-4c3d-a702-94eec4a2808c',
//   'base_price': 1100,
//   'date_from': '2019-07-10T22:55:56.845Z',
//   'date_to': '2019-07-11T11:22:13.375Z',
//   'destination': 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
//   'is_favorite': false,
//   'offers': [
//   'b4c3e4e6-9053-42ce-b747-e281314baa31'
// ],
//   'type': 'taxi'
// }
