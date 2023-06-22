import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoView(tripInfo) {

  const {dates, cities, price} = tripInfo;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cities}</h1>

              <p class="trip-info__dates">${dates}</p>
            </div>
            ${price ? '<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">' + price + '</span></p>' : ''}
          </section>`;
}

export default class TripInfoView extends AbstractView{
  #tripInfo;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }


  get template() {
    return createTripInfoView(this.#tripInfo);
  }

}
