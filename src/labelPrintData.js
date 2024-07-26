// ------------------ Модуль перевірки наявності обʼєктів та отримання данних --------------------
import formString from "./formStrings.js"; // Модуль створення рядків
import createHTML from "./createHTML.js"; // Модуль створення html розмітки

module.exports = (obj) => {
  if(obj){
    // Перевіряємо чи обʼєкт полів для друку товару товару
    if(!obj?.product){
			console.error("create-label-html-data -> Не знайдено обʼєкт товару")
			return
		}
    // Перевіряємо чи обʼєкт налаштувань принтеру
    if(!obj?.dataPrinter){
			console.error("create-label-html-data -> Не знайдено обʼєкт налаштувань принтеру")
			return
		}
    // Перевіряємо чи обʼєкт перекладів
    if(!obj?.translate){
			console.error("create-label-html-data -> Не знайдено обʼєкт перекладів")
			return
		}
    // Перевіряємо чи обʼєкт функцій
    if(!obj?.func){
			console.error("create-label-html-data -> Не знайдено обʼєкт функцій")
			return
		}
    try {
      // Створюємо рядки для формування html
      const strings = formString(obj);
      if(strings.length) {
        // Створюємо html структуру
        const html = createHTML(strings, data.dataPrinter)?.outerHTML;
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