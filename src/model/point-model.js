import Observable from '../framework/observable';
import {UpdateType} from '../const';
import {organizeTripInfo} from '../utils/trip-info';

export default class PointsModel extends Observable{
  #pointsApiService;
  #dataPoints = [];
  #destinations = [];
  #offers = [];
  #orderedData = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  getOrganizationDataPoints(dataPoints) {
    const orderedData = [];
    dataPoints.forEach((point) => {
      const organizedPoint = {
        ...point,
        'allOffers': this.offers,
        'destination': this.destinations.find((e) => e.id === point.destination)
      };

      orderedData.push(organizedPoint);

    });
    return orderedData;
  }

  getTripInfoData(points, offers) {
    return organizeTripInfo(points,offers);
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#dataPoints = points.map(this.#adaptToClient);

      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;

      this.#orderedData = this.getOrganizationDataPoints(this.#dataPoints);
    } catch (err) {
      this.#dataPoints = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#orderedData;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
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

  async updatePoint(updateType, update) {
    const index = this.#orderedData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update nonexistent point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#orderedData = [
        ...this.#orderedData.slice(0, index),
        ...this.getOrganizationDataPoints([updatedPoint]),
        ...this.#orderedData.slice(index + 1)
      ];

      this._notify(updateType, update);

    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#orderedData = [...this.getOrganizationDataPoints([newPoint]), ...this.#orderedData];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add new point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#orderedData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete nonexistent point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#orderedData = [
        ...this.#orderedData.slice(0, index),
        ...this.#orderedData.slice(index + 1)
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }


  }

}

