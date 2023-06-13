import {render} from './framework/render.js';
import TripInfoView from './view/trip-info-view';
import ListPresenter from './presenter/list-presenter';
import FilterPresenter from './presenter/filter-presenter';
import {RenderPosition} from './render.js';
import PointsModel from './model/point-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import {getTripInfo} from './mock/trip-info-mock';
import PointsApiService from './api/points-api-service';

const AUTHORIZATION = 'Basic Alexeya6e8cc7be8dd41d3b5bcff03f1877a95';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.page-body');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteHeaderInfoElement = siteMainElement.querySelector('.trip-main');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

// скорее всего destinationsModel перенесу в pointsModel
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripInfo = getTripInfo();

const listPresenter = new ListPresenter({
  listContainer: siteBodyElement,
  newPointButtonContainer: siteHeaderInfoElement,
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
