import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter';
import {render} from './render.js';
import {RenderPosition} from './render.js';
import PointsModel from './model/point-model';
import DestinationsModel from './model/destinations-model';


const siteMainElement = document.querySelector('.page-body');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteHeaderInfoElement = siteMainElement.querySelector('.trip-main');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

render(new TripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteHeaderFilterElement);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const listPresenter = new ListPresenter({
  listContainer: siteBodyElement,
  pointsModel,
  destinationsModel,
});


listPresenter.init();
