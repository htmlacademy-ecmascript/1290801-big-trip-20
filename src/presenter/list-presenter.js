import SortView from "../view/sort-view";
import PointView from "../view/point-view";
import EditingPointView from "../view/editing-point-view";
import ListView from "../view/list-view";
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    render(new EditingPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }

  }
}
