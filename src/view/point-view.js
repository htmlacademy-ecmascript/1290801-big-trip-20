import AbstractView from '../framework/view/abstract-view.js';
import {formatDateToDatetimeAttr, humanizeDate, timeDifference, trimDate} from '../utils/time';

function createPointTemplate(point) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, allOffers, type} = point;

  const allOffersThisType = allOffers.find((objWithOffers) => objWithOffers.type === type).offers;
  let offersList = '';
  if (offers.length > 0){
    offersList += '<ul class="event__selected-offers">';
    for (let i = 0; i < offers.length; i++){
      const offer = allOffersThisType.find((e) => e.id === offers[i]);
      offersList += `<li class="event__offer">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                  </li>`;
    }
    offersList += '</ul>';
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time
                  class="event__date"
                  datetime="${formatDateToDatetimeAttr(dateFrom)}"
                  >${humanizeDate(dateFrom)}</time>
                <div class="event__type">
                  <img
                    class="event__type-icon"
                    width="42"
                    height="42"
                    src="img/icons/${type}.png"
                    alt="Event type icon"
                  >
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time
                      class="event__start-time"
                      datetime="${trimDate(dateFrom)}"
                    >${humanizeDate(dateFrom, true)}</time>
                    &mdash;
                    <time
                      class="event__end-time"
                      datetime="${trimDate(dateTo)}"
                    >${humanizeDate(dateTo, true)}</time>
                  </p>
                  <p class="event__duration">${timeDifference(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${offersList}
                <button
                  class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}"
                  type="button"
                >
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class PointView extends AbstractView{
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick;

  constructor({point, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleEditClick);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this.#handleFavoriteClick();
  };

}
