import {dateDuration} from './time';
import dayjs from 'dayjs';

function sortPointsEvent(pointA, pointB) {
  if (pointA.type === pointB.type) {
    return 0;
  }
  return pointA.type > pointB.type ? 1 : -1;
}

function sortPointsTime(pointA, pointB) {
  const durationA = dateDuration(pointA.dateFrom, pointA.dateTo);
  const durationB = dateDuration(pointB.dateFrom, pointB.dateTo);
  return durationB - durationA;
}

function sortPointsPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortPointsOffers(pointA, pointB) {
  return pointB.offers.length - pointA.offers.length;
}

function sortPointsDay(pointA, pointB) {
  return (+dayjs(pointA.dateFrom) - +dayjs(pointB.dateFrom));
}


export {
  sortPointsEvent,
  sortPointsTime,
  sortPointsPrice,
  sortPointsOffers,
  sortPointsDay
};
