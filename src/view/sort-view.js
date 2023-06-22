import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const';

const sortTypes = Object.values(SortType);
console.log(sortTypes)


function createSortItemTemplate(type, currentSortType, isDisabled) {

  return `<div class="trip-sort__item  trip-sort__item--${type}">
              <input
                id="sort-${type}"
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="trip-sort"
                value="sort-${type}"
                ${type === currentSortType ? 'checked' : ''}
                ${isDisabled ? 'disabled' : ''}
              >
              <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${type}</label>
            </div>`;
}

function createSortTemplate(currentSortType, isDisabled) {
  const sortItemsTemplate = sortTypes
    .map((sortType) => createSortItemTemplate(sortType, currentSortType, isDisabled))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView{
  #currentSortType;
  #handleSortTypeChange;
  #isDisabled;

  constructor({currentSortType, onSortTypeChange, isDisabled}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#isDisabled = isDisabled;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType, this.#isDisabled);
  }


  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'LABEL') {
      return;
    }
    event.preventDefault();
    this.#handleSortTypeChange(event.target.dataset.sortType);

  };

}
