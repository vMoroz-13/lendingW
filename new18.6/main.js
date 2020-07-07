const hi = document.querySelector('.hi'),
    day = document.querySelector('.day'),
    date = document.querySelector('.date'),
    newYear = document.querySelector('.new_year');
let message = '';
const dateTime = new Date();
let hour = dateTime.getHours();
if (hour >= 5 && hour < 11) {
    message = "Доброе утро";
} else if (hour >= 11 && hour < 18) {
    message = "Добрый день";
} else if (hour >= 18 && hour < 24) {
    message = "Добрый вечер";
} else if (hour >= 0 && hour < 5) {
    message = "Доброй ночи";
}
hi.innerHTML = message;//

const weekday = new Array("Воскресенье", "Понедельник", "Вторник",
    "Среда", "Четверг", "Пятница", "Суббота");
day.innerHTML = `Сегодня: ${weekday[dateTime.getDay()]}`;//
function appNull(time) {
    if (time > 0 && time < 10) {
        return '0' + time;
    } else {
        return time;
    }
}
hour = appNull(dateTime.getHours());
const minutes = appNull(dateTime.getMinutes()),
    seconds = appNull(dateTime.getSeconds());
const ampm = hour >= 12 ? 'PM' : 'AM';

date.innerHTML = `Текущее время: ${hour}:${minutes}:${seconds} ${ampm}`;

const nextDate = new Date("January 1, 2021"),
    //колличество милисекунд в одном дне
    msOneDay = 24 * 60 * 60 * 1000;
// колличество дней
const daysNumbers = Math.round((nextDate.getTime() - dateTime.getTime()) / msOneDay);
//определяем окончание
let dayname = "";
const ds = "" + daysNumbers;
//Вырезаем последнею цифру
const dd = parseInt(ds.substr(ds.length - 1));
//Определяем правильность написания
if (daysNumbers > 4 && daysNumbers < 21) {
    dayname = " дней";
} else if (dd === 1) {
    dayname = " день";
} else if (dd === 2 || dd === 3 || dd === 4) {
    dayname = " дня";
} else {
    dayname = " дней";
}
newYear.innerHTML = `
 До нового года осталось ${daysNumbers} ${dayname}
 `;



