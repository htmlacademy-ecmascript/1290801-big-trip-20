import {remove, render} from '../framework/render';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common';
import {SORT_TYPE} from '../const';
import {sortPointsEvent, sortPointsOffers, sortPointsPrice, sortPointsTime} from '../utils/sort';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #pointsPresenters = new Map;
  #currentSortType = SORT_TYPE.DAY;

  constructor({listContainer, pointsModel, destinationsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SORT_TYPE.EVENT:
        return [...this.#pointsModel.points].sort(sortPointsEvent);
      case SORT_TYPE.TIME:
        return [...this.#pointsModel.points].sort(sortPointsTime);
      case SORT_TYPE.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsPrice);
      case SORT_TYPE.OFFERS:
        return [...this.#pointsModel.points].sort(sortPointsOffers);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.allDestinations = this.#destinationsModel.allDestinations;
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    // тут будет вызываться обновление модели
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint, this.allDestinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderList() {
    if (this.points.length === 0) {
      render(this.#noPointsComponent, this.#listContainer);
      return;
    }

    this.#renderSort();
    render(this.#listComponent, this.#listContainer, 'beforeend');

    this.#renderPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listContainer, 'afterbegin');
  }

  #renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.allDestinations);
    }
  }

  #renderPoint(point, allDestinations) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, allDestinations);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #clearPointsList() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }
}


