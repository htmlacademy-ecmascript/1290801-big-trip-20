import dayjs from 'dayjs';
import {sortPointsDay} from './sort';

/** возвращает объект с данными для tripInfo*/
function organizeTripInfo(points, offers) {
  const allPoints = [...points];
  allPoints.sort(sortPointsDay);
  const tripInfo = {};

  if (allPoints.length > 1) {
    const firstPoint = allPoints[0];
    const lastPoint = allPoints[allPoints.length - 1];

    tripInfo.dates = `${dayjs(firstPoint.dateFrom).format('MMM D')} — ${dayjs(lastPoint.dateFrom).format('D MMM')}`;
    switch (allPoints.length) {
      case 2:
        tripInfo.cities = `${firstPoint.destination.name} — ${lastPoint.destination.name}`;
        break;
      case 3:
        tripInfo.cities = `${firstPoint.destination.name} — ${allPoints[1].destination.name} — ${lastPoint.destination.name}`;
        break;
      default:
        tripInfo.cities = `${firstPoint.destination.name} — ... — ${lastPoint.destination.name}`;
    }

  } else {
    tripInfo.dates = allPoints.length > 1 ? dayjs(allPoints[0].dateFrom).format('MMM D') : '';
    tripInfo.cities = allPoints.length ? allPoints[0].destination.name : '';
  }

  let price = 0;
  allPoints.forEach((point) => {
    price += point.basePrice;
    const allOffersThisType = offers.find((objWithOffers) => objWithOffers.type === point.type).offers;
    for (let i = 0; i < point.offers.length; i++){
      const checkedOffer = allOffersThisType.find((e) => e.id === point.offers[i]);
      price += checkedOffer.price;
    }
  });
  tripInfo.price = price;

  return tripInfo;
}


export {
  organizeTripInfo,
};
