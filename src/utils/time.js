import dayjs from 'dayjs';
import {getRandomInt} from './utils';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

/** возвращает (строка) дату в человекопонятном виде. Если стоит флаг true вторым аргументом, то возвращает время */
function humanizeDate(date, itsTime) {
  const format = !itsTime ? DATE_FORMAT : TIME_FORMAT;
  return date ? dayjs(date).format(format) : '';
}

/** Возвращает (строка) разницу во времени между двумя датами в формате Y Mth H D M */
function timeDifference(timeFrom, timeTo) {
  const diff = dayjs.duration(dayjs(timeTo).diff(dayjs(timeFrom))).$d;
  return (`${diff.year ? `${diff.year}Y ` : ''}`
    + `${diff.months ? `${diff.months}Mth ` : ''}`
    + `${diff.days ? `${diff.days}D ` : ''}`
    + `${diff.hours ? `${diff.hours}H ` : '0H '}`
    + `${diff.minutes ? `${diff.minutes}M` : '0M'}`);
}

/** Возвращает строку со временем UTC. Оно будет случайным и выше текущей даты до недели.
 * Если передать параметром строку с UTC временем,
 * то вернет случайное время со сдвигом от него на расстояние до недели.*/
function getRandomTime(timeFrom) {
  const day = getRandomInt(7);
  const hour = getRandomInt(24);
  const minute = getRandomInt(60);
  if (!timeFrom) {
    return dayjs().add(day, 'day').add(hour, 'hour').add(minute, 'minute').format();
  } else {
    return dayjs(timeFrom).add(day, 'day').add(hour, 'hour').add(minute, 'minute').format();

  }
}

/** обрезает дату до вида, который нужен в html атрибуте dateTime */
function trimDate(date) {
  return date.slice(0, 16);
}

/** форматирует дату для атрибута html datetime */
function formatDateToDatetimeAttr(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

/** форматирует дату для "календарного вида" */
function formatDateToCalendarView(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

/** принимает строку и возвращает ее, но с первой заглавной буквой */
function formatToUpperCaseFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export {
  formatToUpperCaseFirstLetter,
  formatDateToCalendarView,
  formatDateToDatetimeAttr,
  trimDate,
  getRandomTime,
  timeDifference,
  humanizeDate
}
