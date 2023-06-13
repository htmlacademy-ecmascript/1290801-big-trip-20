import Observable from '../framework/observable';
import {getRandomPointsMock} from '../mock/points-mock';
import {getDestination} from '../mock/destination-mock';
import {getOffers} from '../mock/offers-mock';

export default class PointsModel extends Observable{
  #pointsApiService;
  #dataPoints = getRandomPointsMock();
  #orderedData = this.getOrganizationDataPoints(this.#dataPoints);

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient))
    })
  }

  getOrganizationDataPoints(_dataPoints) {
    const orderedData = [];
    _dataPoints.forEach((point) => {
      const organizedPoint = {
        'id' : point.id,
        'dateFrom': point.dateFrom,
        'dateTo': point.dateTo,
        'basePrice': point.basePrice,
        'destination': getDestination(point.destination),
        'isFavorite': point.isFavorite,
        'offers': point.offers,
        'allOffers': getOffers(),
        'type': point.type
      };

      orderedData.push(organizedPoint);

    });
    return orderedData;
  }

  get points() {
    return this.#orderedData;
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateTo: point['date_to'],
      dateFrom: point['date_from'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }


  updatePoint(updateType, update) {
    const index = this.#orderedData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update nonexistent point');
    }

    this.#orderedData = [
      ...this.#orderedData.slice(0, index),
      update,
      ...this.#orderedData.slice(index + 1)
    ];

    this._notify(updateType, update);

  }

  addPoint(updateType, update) {
    this.#orderedData = [
      update,
      ...this.#orderedData
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#orderedData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete nonexistent point');
    }

    this.#orderedData = [
      ...this.#orderedData.slice(0, index),
      ...this.#orderedData.slice(index + 1)
    ];

    this._notify(updateType, update);

  }

  get offers () {
    return getOffers();
  }
}

