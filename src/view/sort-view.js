import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const';

const sortData = Object.values(SortType);


function createSortItemTemplate(type, currentSortType) {

  return `<div class="trip-sort__item  trip-sort__item--${type}">
              <input
                id="sort-${type}"
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="trip-sort"
                value="sort-${type}"
                ${type === currentSortType ? 'checked' : ''}
              >
              <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${type}</label>
            </div>`;
}

function createSortTemplate(currentSortType) {
  const sortItemsTemplate = sortData
    .map((sortType) => createSortItemTemplate(sortType, currentSortType))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView{
  #currentSortType;
  #handleSortTypeChange;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }


  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'LABEL') {
      return;
    }
    event.preventDefault();
    this.#handleSortTypeChange(event.target.dataset.sortType);

  };

}
