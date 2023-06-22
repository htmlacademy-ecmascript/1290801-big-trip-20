import {POINTS_TYPE} from '../const';
import {formatDateToCalendarView, formatToUpperCaseFirstLetter} from '../utils/time';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const EMPTY_POINT = {
  id: '',
  dateFrom: '',
  dateTo: '',
  basePrice: 0,
  allOffers: '',
  isFavorite: false,
  offers: [],
  type: 'taxi',
  destination: {
    description: '',
    id: '',
    name: '',
    pictures: []
  }
};

function createEditingPointView(point, allDestinations) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    allOffers,
    type,
    isDisabled,
    isSaving,
    isDeleting
  } = point;

  const allOffersThisType = allOffers.find((objWithOffers) => objWithOffers.type === type).offers;
  const isNewPoint = !point.id;

  function getDestinationsList() {
    let destinationsList = '';
    allDestinations.forEach((pointDestination) => {
      destinationsList += `<option value="${pointDestination.name}"></option>`;
    });
    return destinationsList;
  }

  function getOffersList() {

    if (allOffersThisType.length === 0){
      return '';
    }

    let offersList = `<section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                        <div class="event__available-offers">`;
    allOffersThisType.forEach((offer) => {
      const isChecked = !!offers.find((pointOffer) => pointOffer === offer.id);
      offersList += `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="${offer.id}"
            type="checkbox"
            name="event-offer-comfort" ${isChecked ? 'checked' : ''}
            ${isDisabled ? ' disabled' : ''}
          >
          <label class="event__offer-label" for="${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
    });
    offersList += '</div></section>';

    return offersList;
  }

  function getPointsCheckBoxes() {
    let pointsCheckBoxes = '';
    POINTS_TYPE.forEach((checkBoxType) => {
      pointsCheckBoxes += `
        <div class="event__type-item">
            <input
              id="event-type-${checkBoxType}-1"
              class="event__type-input visually-hidden"
              type="radio"
              name="event-type"
              value="${checkBoxType}"
              ${type === checkBoxType ? ' checked' : ''}
              ${isDisabled ? ' disabled' : ''}
            >
            <label
              class="event__type-label  event__type-label--${checkBoxType}"
              for="event-type-${checkBoxType}-1"
            >${formatToUpperCaseFirstLetter(checkBoxType)}
            </label>
        </div>`;
    });
    return pointsCheckBoxes;
  }

  function getDestinationInfo() {
    if (destination.id === '') {
      return '';
    }
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
              ${getImagesFromDestinations()}
            </section>`;

  }
  function getImagesFromDestinations() {
    if (destination.pictures.length === 0) {
      return '';
    }
    let images = '';
    destination.pictures.forEach((img) => {
      images += `<img class="event__photo" src="${img.src}" alt="${img.description}">`;
    });

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${images}
        </div>
      </div>`;
  }

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img
                        class="event__type-icon"
                        width="17"
                        height="17"
                        src="img/icons/${type}.png"
                        alt="Event type icon"
                      >
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? ' disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${getPointsCheckBoxes()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${formatToUpperCaseFirstLetter(type)}
                    </label>
                    <input
                      class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${he.encode(destination.name)}"
                      list="destination-list-1"
                      ${isDisabled ? ' disabled' : ''}
                    >
                    <datalist id="destination-list-1">
                      ${getDestinationsList()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="event-start-time"
                      value="${formatDateToCalendarView(dateFrom)}"
                      ${isDisabled ? ' disabled' : ''}
                    >
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="event-end-time"
                      value="${formatDateToCalendarView(dateTo)}"
                      ${isDisabled ? ' disabled' : ''}
                    >
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input
                      class="event__input  event__input--price"
                      id="event-price-1"
                      type="text"
                      name="event-price"
                      value="${basePrice}"
                      ${isDisabled ? ' disabled' : ''}
                    >
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit " ${isDisabled ? ' disabled' : ''}>
                    ${isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? ' disabled' : ''}>
                    ${isNewPoint ? 'Cancel' : ''}
                    ${!isNewPoint && isDeleting ? 'Deleting...' : ''}
                    ${!isNewPoint && !isDeleting ? 'Delete' : ''}
                  </button>
                  ${isNewPoint ? '' : '<button class="event__rollup-btn" type="button">'}
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                <section class="event__details">
                  ${getOffersList()}
                  ${getDestinationInfo()}

                </section>
              </form>
            </li>`;
}

export default class EditingPointView extends AbstractStatefulView {
  #allDestinations = null;
  #handleFormSubmit;
  #handleResetForm;
  #handleDeleteClick;
  #datePickerFrom;
  #datePickerTo;
  #allOffers;

  constructor({point = EMPTY_POINT, allDestinations, onFormSubmit, onFormReset, onDeleteClick, allOffers = []}) {
    super();
    this.#allDestinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleResetForm = onFormReset;
    this.#handleDeleteClick = onDeleteClick;
    this.#allOffers = allOffers;

    if (allOffers.length > 0){
      EMPTY_POINT.allOffers = this.#allOffers;
    }

    this.point = {...point};
    this._setState(EditingPointView.parsePointToState(point));

    this._restoreHandlers();
  }

  get template() {
    return createEditingPointView(this._state, this.#allDestinations);
  }

  #setDatePicker = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    this.#datePickerFrom = flatpickr(dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: formatDateToCalendarView(this._state.dateFrom),
        onClose: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: formatDateToCalendarView(this._state.dateTo),
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true
      });
    this.#datePickerTo = flatpickr(dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: formatDateToCalendarView(this._state.dateTo),
        onClose: this.#dateToChangeHandler,
        enableTime: true,
        minDate: formatDateToCalendarView(this._state.dateFrom),
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true
      });
  };

  #formSubmitHandler = (event) => {
    event.preventDefault();
    if (JSON.stringify(this._state) === JSON.stringify(this.point) && this._state.id) {
      this.#handleResetForm();
      return;
    }
    this.#handleFormSubmit(EditingPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (event) => {
    event.preventDefault();
    this.#handleDeleteClick(EditingPointView.parseStateToPoint(this._state));
  };

  reset(point) {
    this.updateElement(
      EditingPointView.parsePointToState(point)
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  #pointTypeChangeHandler = (event) => {
    event.preventDefault();
    //обработчик выбора типа точки
    this.updateElement({
      ...this._state,
      type: event.target.value,
      offers: []
    });
  };

  #destinationChangeHadnler = (event) => {
    event.preventDefault();
    //обработчик выбора направления (города)
    const selectedDestination = this.#allDestinations.find((destination) => destination.name === event.target.value);
    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      ...this._state,
      destination: selectedDestination
    });
  };

  #offerClickHandler = () => {
    //обработчик выбора оферов
    const checkBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      ...this._state,
      offers: checkBoxes.map((element) => element.id)
    });
  };

  #priceInputHandler = (event) => {
    event.preventDefault();
    //обработчик изменения цены (перерисовывать компонент не нужно)
    const newPrice = parseInt(event.target.value.replace(/[^0-9]/g, '') || '0', 10);

    this._setState({
      ...this._state,
      basePrice: newPrice
    });
  };

  #rollupClickHandler = () => {
    this.#handleResetForm();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      ...this._state,
      dateFrom: dayjs(userDate).format()
    });
    this.#datePickerTo.set('minDate', formatDateToCalendarView(this._state.dateFrom));
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      ...this._state,
      dateTo: dayjs(userDate).format()
    });
    this.#datePickerFrom.set('maxDate', formatDateToCalendarView(this._state.dateTo));
  };

  _restoreHandlers = () => {
    //кнопка Save
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    //кнопка Delete
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    //стрелочка вверх
    this.element.querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#rollupClickHandler);
    //выбор типа путешествия
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    //выбор направления путешествия
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHadnler);
    //кнопки offers
    this.element.querySelector('.event__available-offers')?.addEventListener('click', this.#offerClickHandler);
    //поле ввода цены
    this.element.querySelector('.event__input.event__input--price').addEventListener('input', this.#priceInputHandler);
    //добавление календарей
    this.#setDatePicker();

  };

  static parsePointToState(point) {

    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}

