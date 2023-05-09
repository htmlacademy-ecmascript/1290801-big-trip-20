import {getDestination} from '../mock/destination-mock';

export default class DestinationsModel {
  destinations = getDestination();

  getAllDestinations() {
    return this.destinations;
  }
}
