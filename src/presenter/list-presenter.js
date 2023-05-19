import {render, replace} from '../framework/render';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import ListView from '../view/list-view';
import EditingPointView from '../view/editing-point-view';
import NoPointsView from '../view/no-points-view';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;


  #listComponent = new ListView();
  #sortComponent = new SortView();

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

  #renderList() {
    if (this.listPoints.length === 0){
      render(new NoPointsView, this.#listContainer);
      return;
    }
    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);
    for (let i = 0; i < this.listPoints.length; i++) {
      this.#renderPoint(this.listPoints[i], this.allDestinations);

    }
  }

  #renderPoint(point, allDestinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditingPointView({
      point,
      allDestinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }


    render(pointComponent, this.#listComponent.element);
  }
}


