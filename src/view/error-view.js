import AbstractView from '../framework/view/abstract-view';

function createErrorView() {
  return '<p class="trip-events__msg">Oops. It looks like an error occurred while getting data from the server. ' +
    'Please refresh the page or try again later. </p>';
}

export default class ErrorView extends AbstractView{


  get template() {
    return createErrorView();
  }
}
