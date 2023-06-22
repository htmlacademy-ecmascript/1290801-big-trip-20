import dayjs from 'dayjs';
import {sortPointsDay} from './sort';


/** возвращает сумму всего путешествия для tripInfo*/
function getTripInfoPrice(allPoints, offers) {
  let price = 0;
  allPoints.forEach((point) => {
    price += point.basePrice;
    const allOffersThisType = offers.find((objWithOffers) => objWithOffers.type === point.type).offers;
    point.offers.forEach((pointOffer) =>{
      const checkedOffer = allOffersThisType.find((offer) => offer.id === pointOffer);
      price += checkedOffer.price;
    });
  });
  return price;
}

/** возвращает строку с датами для tripInfo*/
function getTripInfoDates(allPoints) {
  let dates;
  if (allPoints.length > 1) {
    const firstPoint = allPoints[0];
    const lastPoint = allPoints[allPoints.length - 1];

    dates = `${dayjs(firstPoint.dateFrom).format('MMM D')} — ${dayjs(lastPoint.dateTo).format('D MMM')}`;
  } else {
    dates = allPoints.length > 0 ? dayjs(allPoints[0].dateFrom).format('MMM D') : '';
  }

  if (dates.slice(0,3) === dates.slice(-3)){
    dates = dates.slice(0, -3);
  }
  return dates;
}
/** возвращает строку с городами для tripInfo*/
function getTripInfoCities(allPoints) {
  let cities;
  if (allPoints.length > 1) {
    const firstPoint = allPoints[0];
    const lastPoint = allPoints[allPoints.length - 1];

    switch (allPoints.length) {
      case 2:
        cities = `${firstPoint.destination.name} — ${lastPoint.destination.name}`;
        break;
      case 3:
        cities = `${firstPoint.destination.name} — ${allPoints[1].destination.name} — ${lastPoint.destination.name}`;
        break;
      default:
        cities = `${firstPoint.destination.name} — ... — ${lastPoint.destination.name}`;
    }

  } else {
    cities = allPoints.length ? allPoints[0].destination.name : 'Get ready for adventure!';
  }

  return cities;
}

/** возвращает объект с данными для tripInfo*/
function organizeTripInfo(points, offers) {
  const allPoints = [...points];
  allPoints.sort(sortPointsDay);
  const tripInfo = {};

  tripInfo.cities = getTripInfoCities(allPoints);
  tripInfo.dates = getTripInfoDates(allPoints);
  tripInfo.price = getTripInfoPrice(allPoints, offers);

  return tripInfo;
}


export {
  organizeTripInfo,
};
