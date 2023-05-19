import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoView(tripInfo) {

  const {month, dayStart, dayEnd, cities, cost} = tripInfo;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cities}</h1>

              <p class="trip-info__dates">${month} ${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
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
