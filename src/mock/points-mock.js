import {getRandomArrayElement, humanizeDate, timeDifference, getRandomInt, getRandomTimeFrom} from '../utils';
import {POINTS_TYPE} from '../const';

const pointDestination = ['Moscow', 'Texas', 'London', 'Tokyo', 'New-York'];

const timeFrom = "2019-07-11T12:00:00.000Z";
const timeTo = "2019-07-11T13:00:00.000Z";


//Задачи;
// переработать время. Тут его хранить в двух переменных from и to;
// во VIEW уже делать со временем все необходимые преобразования;
// подготовить для этого в utils нужные функции;
// соединить offers и points;
// Настроить VIEW для точек и сделать VIEW для формы редактирования/создания. Сделать пустую точку для формы создания;
// Перенастроить версии в package.json;

//готово
// Документация utils;
// Переделать функцию определения разницы во времени;
// Сделать функции для генерации времени;





function getRandomPoint() {

  //генерация случайного времени для timeFrom

  //увеленичение timeFrom на случайное количество минут


  const mockPoints = [
    {
      "basePrice": getRandomInt(3000),
      "timeFrom": humanizeDate(timeFrom, true),
      "timeTo": humanizeDate(timeTo, true),
      "date" : humanizeDate(timeFrom),
      "duration" : timeDifference(timeFrom, timeTo),
      "destination": getRandomArrayElement(pointDestination),
      "isFavorite": getRandomInt(2),
      "offers": [
        "some offer one",
        "some offer two"
      ],
      "type": getRandomArrayElement(POINTS_TYPE)
    },
  ];
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};

// From server:
// {
//   "id": "f4b62099-293f-4c3d-a702-94eec4a2808c",
//   "base_price": 1100,
//   "date_from": "2019-07-10T22:55:56.845Z",
//   "date_to": "2019-07-11T11:22:13.375Z",
//   "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
//   "is_favorite": false,
//   "offers": [
//   "b4c3e4e6-9053-42ce-b747-e281314baa31"
// ],
//   "type": "taxi"
// }
