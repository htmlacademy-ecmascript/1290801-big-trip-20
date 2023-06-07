import { remove, render, RenderPosition } from '../framework/render.js';
import EditingPointView from '../view/editing-point-view';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointsContainer;
  #handleDataChange;
  #handleDestroy;

  #pointEditComponent = null;

  #allDestinations;
  #allOffers;

  constructor({ pointsContainer, onDataChange, onDestroy, allDestinations, allOffers }) {
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
  }


  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditingPointView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
    });

    render(this.#pointEditComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }


  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point, id: crypto.randomUUID() },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.destroy();
    }
  };
}
