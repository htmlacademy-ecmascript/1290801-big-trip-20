import {FILTER_TYPE} from '../const';
import {checkFuture, checkPresent, checkPast} from './time';


const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => checkFuture(point.dateFrom)),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => checkPresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => checkPast(point.dateTo)),
  [FILTER_TYPE.FAVORITE]: (points) => points.filter((point) => point.isFavorite),
};

export {filter};
