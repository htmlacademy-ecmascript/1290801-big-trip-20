import {remove, render} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import LoadingView from '../view/loading-view';
import NewPointButtonView from '../view/new-point-button-view';
import PointPresenter from './point-presenter';
import {SortType, FilterType, UpdateType, UserAction} from '../const';
import {sortPointsDay, sortPointsEvent, sortPointsOffers, sortPointsPrice, sortPointsTime} from '../utils/sort';
import {filter} from '../utils/filter';
import NewPointPresenter from './new-point-presenter';
import TripInfoView from '../view/trip-info-view';
import {getTripInfo} from '../mock/trip-info-mock';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class ListPresenter {
  #listContainer = null;
  #newPointButtonContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();
  #tripInfoComponent = null;
  #newPointButton = null;

  #pointsPresenters = new Map;
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({listContainer, newPointButtonContainer, pointsModel, filterModel}) {
    this.#listContainer = listContainer;
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsDay);
      case SortType.EVENT:
        return filteredPoints.sort(sortPointsEvent);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsPrice);
      case SortType.OFFERS:
        return filteredPoints.sort(sortPointsOffers);
    }

    return filteredPoints;
  }

  init() {
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // Обновить часть списка (точку), может использоваться для добавления в избранное,
        // если я уберу такой фильтр. Сейчас там MINOR
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
      case UpdateType.INIT:
        // запускается при инициализации модели
        this.#isLoading = false;
        this.#newPointButton = new NewPointButtonView({onClick: this.#newPointButtonClickHandler});
        render(this.#newPointButton, this.#newPointButtonContainer, 'beforeend');
        remove(this.#loadingComponent);
        this.#updateDestinationsAndOffersHandler();
        this.#renderList();
    }
  };

  #updateDestinationsAndOffersHandler() {
    this.allDestinations = this.#pointsModel.destinations;

    this.#newPointPresenter = new NewPointPresenter({
      pointsContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler,
      allDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers,
    });

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();

  };

  #renderList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#newPointButton.element.disabled) {
      this.#renderNoPoints();
      return;
    }

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    this.#renderSort();
    render(this.#listComponent, this.#listContainer, 'beforeend');
    this.#renderTripInfo();
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

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView(this.#pointsModel.getTripInfoData(this.#pointsModel.points, this.#pointsModel.offers));
    render(this.#tripInfoComponent, this.#newPointButtonContainer, 'afterbegin')
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
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }


  #newPointButtonClickHandler = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    this.#newPointButton.element.disabled = true;
  };

  #newPointDestroyHandler = () => {
    this.#newPointButton.element.disabled = false;

  };


}


