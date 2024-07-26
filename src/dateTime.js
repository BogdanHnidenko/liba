// ----------------- Модуль отримання дати та часу ------------------------
export default {
  // Глобальна функція повернення поточного часу
  currentTime:  () => {
    const d = new Date()
    let hh = String(d.getHours());
    if (+hh < 10) hh = '0' + hh;
    let mm = String(d.getMinutes());
    if (+mm < 10) mm = '0' + mm;
    let ss = String(d.getSeconds());
    if (+ss < 10) ss = '0' + ss;
    return hh + ':' + mm + ':' + ss;
  },
  // Глобальна функція повернення поточної дати
  currentDate: () => {
    const date = new Date();
    let dd = String(date.getDate());
    if (+dd < 10) dd = '0' + dd;
    let mm = String(date.getMonth() + 1);
    if (+mm < 10) mm = '0' + mm;
    let yy = String(date.getFullYear());
    return dd + '.' + mm + "." + yy;
  }
}
