import {getRandomPointsMock} from '../mock/points-mock';
import {getDestination} from '../mock/destination-mock';
import {getOffers} from '../mock/offers-mock';

export default class PointsModel {
  #dataPoints = getRandomPointsMock();

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
        // 'allOffersThisType' : getOffers(point.type).offers,
        'allOffers': getOffers(),
        'type': point.type
      };

      orderedData.push(organizedPoint);

    });
    return orderedData;

  }

  get points() {
    return this.getOrganizationDataPoints(this.#dataPoints);
  }
}

