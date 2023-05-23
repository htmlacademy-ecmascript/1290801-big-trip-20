import PointView from '../view/point-view';
import EditingPointView from '../view/editing-point-view';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointsContainer = null;
  #handleDataChange;
  #handleModeChange;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #allDestinations = null;
  #mode = Mode.DEFAULT;


  constructor({pointsContainer, onDataChange, onModeChange}) {
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  init(point, allDestinations) {
    this.#point = point;
    this.#allDestinations = allDestinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point,
      onEditClick: () => {
        this.#replacePointToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#pointEditComponent = new EditingPointView({
      point,
      allDestinations,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
      }
    });
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    // Проверка на наличие в DOM
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  // destroy() {
  //   remove(this.#pointComponent);
  //   remove(this.#pointEditComponent);
  // }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }


  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  // #handleFormSubmit = (point) => {
  //   this.#handleDataChange(point);
  //   this.#replaceFormToPoint();
  // };

}
