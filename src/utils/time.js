import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const MS_IN_ONE_HOUR = 3600000;
const MS_IN_ONE_DAY = 86400000;

/** возвращает (строка) дату в человекопонятном виде. Если стоит флаг true вторым аргументом, то возвращает время */
function humanizeDate(date, itsTime) {
  const format = !itsTime ? DATE_FORMAT : TIME_FORMAT;
  return date ? dayjs(date).format(format) : '';
}

/** Возвращает (строка) разницу во времени между двумя датами в формате H D M */
const timeDifference = (dateFrom, dateTo) => {
  const timeDiff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).$ms;
  let timeGap;
  let days;
  let formattedMinutesAndHours;
  switch (true) {
    //больше дня
    case (timeDiff >= MS_IN_ONE_DAY):
      days = Math.floor(timeDiff / MS_IN_ONE_DAY);
      formattedMinutesAndHours = dayjs.duration(timeDiff - days * MS_IN_ONE_DAY).format('HH[H] mm[M]');
      timeGap = `${days}D ${formattedMinutesAndHours}`;
      break;
    //больше часа
    case (timeDiff >= MS_IN_ONE_HOUR):
      timeGap = 'больше часа';
      timeGap = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    //меньше часа
    case (timeDiff < MS_IN_ONE_HOUR):
      timeGap = 'меньше часа';
      timeGap = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return timeGap;
};
/** обрезает дату до вида, который нужен в html атрибуте dateTime */
function trimDate(date) {
  return date.slice(0, 16);
}

/** форматирует дату для атрибута html datetime */
function formatDateToDatetimeAttr(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

/** форматирует дату для "календарного вида". если даты нет (пустая строка), вернется сообщение 'enter date'*/
function formatDateToCalendarView(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

/** принимает строку и возвращает ее, но с первой заглавной буквой */
function formatToUpperCaseFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

/** возвращает продолжительность (в ms) между двумя датами */
function dateDuration(dateA, dateB) {
  return dayjs.duration(dayjs(dateB).diff(dayjs(dateA))).$ms;
}

/** возвращает true если data в будущем */
function checkFuture(date) {
  return dayjs().diff(dayjs(date)) < 0;
}

/** возвращает true если текущий момент находится в промежутке между dateFrom и dateTo*/
function checkPresent(dateFrom, dateTo) {
  return dayjs().diff(dayjs(dateTo)) < 0 && dayjs().diff(dayjs(dateFrom)) > 0;
}

/** возвращает true если data в прошлом */
function checkPast(date) {
  return dayjs().diff(dayjs(date)) > 0;
}


export {
  formatToUpperCaseFirstLetter,
  formatDateToCalendarView,
  formatDateToDatetimeAttr,
  trimDate,
  timeDifference,
  humanizeDate,
  dateDuration,
  checkFuture,
  checkPresent,
  checkPast
};
