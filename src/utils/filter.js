import {FILTER_TYPE} from '../const';
// import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from './task';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points,
  [FILTER_TYPE.PRESENT]: (points) => points,
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => point.isFavorite === null),
  [FILTER_TYPE.FAVORITE]: (points) => points.filter((point) => point.isFavorite),
};

export {filter};
