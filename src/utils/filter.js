import {FilterType} from '../const';
import {checkFuture, checkPresent, checkPast} from './time';


const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => checkFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checkPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => checkPast(point.dateTo)),
  [FilterType.FAVORITE]: (points) => points.filter((point) => point.isFavorite),
};

export {filter};
