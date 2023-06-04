import {render} from './framework/render.js';
import TripInfoView from './view/trip-info-view';
import ListPresenter from './presenter/list-presenter';
import FilterPresenter from './presenter/filter-presenter';
import {RenderPosition} from './render.js';
import PointsModel from './model/point-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import {getTripInfo} from './mock/trip-info-mock';


const siteMainElement = document.querySelector('.page-body');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteHeaderInfoElement = siteMainElement.querySelector('.trip-main');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripInfo = getTripInfo();

const listPresenter = new ListPresenter({
  listContainer: siteBodyElement,
  pointsModel,
  destinationsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer:  siteHeaderFilterElement,
  filterModel,
  pointsModel
});

render(new TripInfoView(tripInfo), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
filterPresenter.init();

listPresenter.init();
