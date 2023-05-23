import {render} from '../framework/render';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;

  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noPointsComponent = new NoPointsView();

  #allPoints = [];
  #pointsPresenters = new Map;

  constructor({listContainer, pointsModel, destinationsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.listPoints = this.#pointsModel.points;
    this.allDestinations = this.#destinationsModel.allDestinations;
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#allPoints = updateItem(this.#allPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint, this.allDestinations);
  };

  #renderList() {
    if (this.listPoints.length === 0){
      render(this.#noPointsComponent, this.#listContainer);
      return;
    }
    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.listPoints.length; i++) {
      this.#renderPoint(this.listPoints[i], this.allDestinations);

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

  // #clearPointsList() {
  //   this.#pointsPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointsPresenters.clear();
  // }
}


