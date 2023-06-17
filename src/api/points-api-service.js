import ApiService from '../framework/api-service';

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);

  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point['basePrice'],
      'date_to': point['dateTo'],
      'date_from': point['dateFrom'],
      'is_favorite': point['isFavorite'],
      destination: point.destination.id,
    };

    delete adaptedPoint['basePrice'];
    delete adaptedPoint['dateTo'];
    delete adaptedPoint['dateFrom'];
    delete adaptedPoint['isFavorite'];
    delete adaptedPoint['allOffers'];

    return adaptedPoint;
  }
}
