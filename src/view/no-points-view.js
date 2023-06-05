import AbstractView from '../framework/view/abstract-view';
import {FILTER_TYPE} from '../const';

const NoPointsTextType = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.FAVORITE]: 'There are no favorite events now. Click the star on your point to add it to your favourites',
};

function createNoPointsView(filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
}

export default class NoPointsView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsView(this.#filterType);
  }
}

