import {getDestination} from '../mock/destination-mock';

export default class DestinationsModel {
  #destinations = getDestination();

  get allDestinations() {
    console.log('d model')
    return this.#destinations;
  }

}
