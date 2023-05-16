import {render} from '../framework/render';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import ListView from '../view/list-view';
import EditingPointView from '../view/editing-point-view';


export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null


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

    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);
    render(new EditingPointView({point: this.listPoints[0]}, this.allDestinations), this.#listComponent.element);
    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView({point: this.listPoints[i]}), this.#listComponent.element);
    }

  }
}


