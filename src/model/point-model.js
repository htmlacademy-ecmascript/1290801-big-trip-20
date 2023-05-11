import {getRandomPointsMock} from '../mock/points-mock';
import {getDestination} from '../mock/destination-mock';
import {getOffers} from '../mock/offers-mock';

export default class PointsModel {
  _dataPoints = getRandomPointsMock();

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
        'allOffersThisType' : getOffers(point.type).offers,
        'type': point.type
      };

      orderedData.push(organizedPoint);

    });
    return orderedData;

  }

  getPoints() {
    return this.getOrganizationDataPoints(this._dataPoints);
  }
}

