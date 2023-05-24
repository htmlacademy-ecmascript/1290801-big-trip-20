import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortData, isChecked) {
  const {type, count} = sortData;

  return `<div class="trip-sort__item  trip-sort__item--day">
              <input
                id="sort-${type}"
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="trip-sort"
                value="sort-${type}"
                ${isChecked ? 'checked' : ''}
                ${count === 0 ? 'disabled' : ''}
              >
              <label class="trip-sort__btn" for="sort-day">${type}</label>
            </div>`
}

function createSortTemplate(sortData) {
  const sortItemsTemplate = sortData
    .map((filter, index) => createSortItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView{
  get template() {
    return createSortTemplate();
  }

}
