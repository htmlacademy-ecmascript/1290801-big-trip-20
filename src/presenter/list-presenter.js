import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import ListView from '../view/list-view';
import EditingPointView from '../view/editing-point-view';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();
  sortComponent = new SortView();

  constructor({listContainer, pointsModel, destinationsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.listPoints = this.pointsModel.getPoints();
    this.allDestinations = this.destinationsModel.getAllDestinations();

    render(this.sortComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new EditingPointView({point: this.listPoints[0]}, this.allDestinations), this.listComponent.getElement());
    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView({point: this.listPoints[i]}), this.listComponent.getElement());
    }

  }
}


