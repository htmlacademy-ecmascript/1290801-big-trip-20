import {getDestination} from '../mock/destination-mock';

export default class DestinationsModel {
  #destinations = getDestination();

  get allDestinations() {
    return this.#destinations;
  }

}
