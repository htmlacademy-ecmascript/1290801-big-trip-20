import {render} from './framework/render.js';
import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter';
import {RenderPosition} from './render.js';
import PointsModel from './model/point-model';
import DestinationsModel from './model/destinations-model';
import {generateFilter} from './mock/filter-mock';
import {getTripInfo} from './mock/trip-info-mock';


const siteMainElement = document.querySelector('.page-body');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteHeaderInfoElement = siteMainElement.querySelector('.trip-main');
const siteBodyElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();

const filters = generateFilter(pointsModel.points);
const tripInfo = getTripInfo();

const listPresenter = new ListPresenter({
  listContainer: siteBodyElement,
  pointsModel,
  destinationsModel,
});

render(new TripInfoView(tripInfo), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), siteHeaderFilterElement);

listPresenter.init();
