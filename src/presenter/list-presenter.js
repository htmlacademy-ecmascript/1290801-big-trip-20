import {remove, render} from '../framework/render';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';
import {SORT_TYPE, FILTER_TYPE, UpdateType, UserAction} from '../const';
import {sortPointsEvent, sortPointsOffers, sortPointsPrice, sortPointsTime} from '../utils/sort';
import {filter} from '../utils/filter';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = null;

  #pointsPresenters = new Map;
  #currentSortType = SORT_TYPE.DAY;
  #filterType = FILTER_TYPE.EVERYTHING;

  constructor({listContainer, pointsModel, destinationsModel, filterModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPE.EVENT:
        return filteredPoints.sort(sortPointsEvent);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortPointsTime);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointsPrice);
      case SORT_TYPE.OFFERS:
        return filteredPoints.sort(sortPointsOffers);
    }

    return filteredPoints;
  }

  init() {
    this.allDestinations = this.#destinationsModel.allDestinations;
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // обновить часть списка (точку), пока используется только для добавления в избранное
        this.#pointsPresenters.get(data.id).init(data, this.allDestinations);
        break;
      case UpdateType.MINOR:
        // обновление списка без сброса сортировок
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        // обновления списка со сбросом сортировок в положение DAY
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();

  };

  #renderList() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
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

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#listContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point, this.allDestinations));
  }

  #renderPoint(point, allDestinations) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, allDestinations);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #clearList({resetSortType = false} = {}) {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
  }


}


