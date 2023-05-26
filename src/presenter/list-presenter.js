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

  #allPoints = [];
  #pointsPresenters = new Map;
  #currentSortType = SORT_TYPE.DAY;
  #sourcedAllPoints;

  constructor({listContainer, pointsModel, destinationsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#allPoints = this.#pointsModel.points;
    this.allDestinations = this.#destinationsModel.allDestinations;
    this.#sourcedAllPoints = [...this.#allPoints];
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#allPoints = updateItem(this.#allPoints, updatedPoint);
    this.#sourcedAllPoints = updateItem(this.#allPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint, this.allDestinations);
  };

  #sortPointTasks(sortType) {
    switch (sortType) {
      case SORT_TYPE.EVENT:
        this.#allPoints.sort(sortPointsEvent);
        break;
      case SORT_TYPE.TIME:
        this.#allPoints.sort(sortPointsTime);
        break;
      case SORT_TYPE.PRICE:
        this.#allPoints.sort(sortPointsPrice);
        break;
      case SORT_TYPE.OFFERS:
        this.#allPoints.sort(sortPointsOffers);
        break;
      default:
        this.#allPoints = [...this.#sourcedAllPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPointTasks(sortType);
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderList() {
    if (this.#allPoints.length === 0){
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
    for (let i = 0; i < this.#allPoints.length; i++) {
      this.#renderPoint(this.#allPoints[i], this.allDestinations);
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


