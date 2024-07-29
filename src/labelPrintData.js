// ------------------ Модуль перевірки наявності обʼєктів та отримання данних --------------------
import formString from "./formStrings.js"; // Модуль створення рядків
import createHTML from "./createHTML.js"; // Модуль створення html розмітки

export default (obj, devMode) => {
  if(obj){
    // Обʼєкт для перевірки наявності всіх налаштувань
    const checkObj = {
      product: "create-label-html-data -> Не знайдено обʼєкт товару",
      dataPrinter: "create-label-html-data -> Не знайдено обʼєкт налаштувань принтеру",
      translate: "create-label-html-data -> Не знайдено обʼєкт перекладів",
      func: "create-label-html-data -> Не знайдено обʼєкт функцій"
    }
    for(let key in checkObj){
      if(!obj[key]) {
        console.error(checkObj[key])
        return
      }
    }
    try {
      // Створюємо рядки для формування html
      const strings = formString(obj, devMode);
      if(strings?.length) {
        // Створюємо html структуру
        const html = createHTML(strings, obj.dataPrinter, devMode)?.outerHTML;
        if (html) return html
      }
    } catch (err){
      console.error('create-label-html-data -> Щось пішло не так', err)
    }
  } else {
    console.error('create-label-html-data -> Не знайдено обʼєкт данних')
  }
  return
}