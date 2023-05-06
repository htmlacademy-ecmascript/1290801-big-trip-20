import {getRandomPoint} from '../mock/points-mock';

const POINT_COUNT = 15;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}

