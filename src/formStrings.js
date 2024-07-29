// ----------------- Модуль формування рядків для принтера етикеток ---------------------------
import dateTime from './dateTime.js'; // Модуль для встановлення поточної дати та часу
export default (data, devMode) => {
	try {
		// Налаштування принтера етикеток, товар, переклади, функції
		const {dataPrinter, product, translate, func} = data;
		// Масив полів які треба друкувати
		const fieldsOption = dataPrinter?.labelParams?.fields || [];
		// Масив для певного порядку розташування полів
		const fieldsForWrap = ['productType','vendorCode', 'weight', 'size'].filter(item => fieldsOption.includes(item) && !!product[item]);
		// Отримуємо розташування тексту
		const setTextAlign = (value) => {
			const index = fieldsForWrap.indexOf(value)
			return [0, 2].includes(index) ? 'left' : 'right'
		}
		// Перевіряємо чи є данне значення та чи це не звичайний шаблон
		const checkTemplate = (value) => {
			return !!value && (dataPrinter?.labelParams?.template !== "simple")
		}
		// Отримуємо розмір
		const setSize = (size, defaultValue) => {
			// Переводимо dpi до стандарту
			const dpiValue = +dataPrinter?.sizes?.dpi / 72;
			// Якщо є розмір то прораховуємо його якщо ні то дефолтне значення
			return (dpiValue * parseFloat(checkTemplate(size) ? +size : +defaultValue));
		}
		// Отримуємо поточну дату та час
		const getCurrentDate = () => {
			try {
				if(fieldsOption.includes('date')){
					// Створюємо нову дату
					let fullDate = dateTime.currentDate()
					// Перевіряємо чи є поле часу
					if(fieldsOption.includes('time')){
						const time = dateTime.currentTime()
						fullDate = fullDate + ' ' + time;
					}
					return fullDate
				}
			} catch (error) {
				console.error(`create-label-html-data -> Не вдалось отримати дату або час`, error)
			}
		}
		// Повертаємо масив рядків
		return [
			// Обʼєкт назви товару
			{
				verification: fieldsOption.includes('name') && !!product.name, // Перевірка поля
				title: "name", // Назва поля
				value: +dataPrinter?.sizes?.nameLength ? product.name.substring(0, dataPrinter?.sizes?.nameLength) : product.name, // Значення поля
				align:  "center", // Розміщення на етикетці
				fontSize: setSize(dataPrinter?.sizes?.nameFont, 0.8) // Значення шрифту
			},
			// Обʼєкт виробника товару
			{
				verification: fieldsOption.includes('manufacturer') && !!product.manufacturer, // Перевірка поля
				title: "manufacturer", // Назва поля
				value: product.manufacturer, // Значення поля
				align: "center", // Розміщення поля
				fontSize: setSize(dataPrinter?.sizes?.manufacturerFont, 0.8), // Шрифт поля
			},
			// Обʼєкт типу товару
			{
				verification: fieldsOption.includes('productType') && !!product.productType, // Перевірка поля
				title: "productType", // Назва поля
				value: product.productType, // Значення поля
				align: setTextAlign('productType'), // Розміщення тексту
				fontSize: setSize(dataPrinter?.sizes?.typeFont, 0.8), // Шрифт поля
			},
			// Обʼєкт артикля товару
			{
				verification: fieldsOption.includes('vendorCode') && !!product.vendorCode, // Перевірка поля
				title: "vendorCode", // Назва поля
				value: product.vendorCode, // Значення поля
				align: setTextAlign('vendorCode'), // Розміщення тексту
				fontSize: setSize(dataPrinter?.sizes?.vendorCodeFont, 0.8), // Шрифт поля
			},
			// Обʼєкт ваги товару
			{
				verification: fieldsOption.includes('weight') && !!product.weight, // Перевірка поля
				title: "weight", // Назва поля
				value: translate?.weight ? `${translate?.weight}: ${product.weight + func.unit(product.unit)}` : '', // Значення поля
				align: setTextAlign('weight'), // Розміщення тексту
				fontSize: setSize(dataPrinter?.sizes?.weightFont, 0.8), // Шрифт поля
			},
			// Обʼєкт розміру товару
			{
				verification: fieldsOption.includes('size') && !!product.size, // Перевірка поля
				title: "size", // Назва поля
				value: translate?.size ? `${translate?.size}: ${product.size}` : '', // Значення поля
				align: setTextAlign('size'), // Розміщення тексту
				fontSize: setSize(dataPrinter?.sizes?.sizeFont, 0.8), // Шрифт поля
			},
			// Обʼєкт опису товару
			{
				verification: fieldsOption.includes('description') && !!product.description, // Перевірка поля
				title: "description", // Назва поля
				value: product.description, // Значення поля
				align: 'center', // Розміщення тексту
				fontSize: setSize(dataPrinter?.sizes?.descriptionFont, 0.4) // Шрифт поля
			},
			// Обʼєкт дати товару
			{
				verification: fieldsOption.includes('date'), // Перевірка поля
				title: "date", // Назва поля
				value: getCurrentDate(), // Значення поля
				align: "center", // Розміщення поля
				fontSize: setSize(dataPrinter?.sizes?.dateTimeFont, 0.5), // Шрифт поля
			},
			// Обʼєкт штрих-коду товару
			{
				verification: fieldsOption.includes('barcode') && !!product?.barcode?.value, // Перевірка поля
				title: 'barcode', // Назва поля
				barcodeType: product?.barcode?.type || "EAN13", // Тип штрихкоду
				value: product?.barcode?.value || "", // Значення поля
				fontSize: (checkTemplate(dataPrinter?.sizes?.barcodeFont) ? dataPrinter?.sizes?.barcodeFont : 20) * 1.5, // Шрифт поля
				width: checkTemplate(dataPrinter?.sizes?.barWidth) ? parseFloat(dataPrinter?.sizes?.barWidth) : 3, // Ширина штрихкоду
				height: setSize(dataPrinter?.sizes?.barcodeHeight, 30) // Висота штрихкоду
			},
			// Обʼєкт ціни товару
			{
				verification: fieldsOption.includes('price') && !!product.price, // Перевірка поля
				title: 'price', // Назва поля
				align:  "space-between", // Розташування
				valueName: translate?.price ? `${translate?.price}:` : "", // Значення поля
				valuePrice: func.currencyFormatted(product?.price), // Значення поля
				valueUnit: product?.currency + (product.unit ? "/" + func.unit(product.unit) : ""), // Значення поля
				fontSize: setSize(dataPrinter?.sizes?.priceFont, 0.8), // Шрифт поля
			}
		].filter(item => {
			if(item.verification){
				return item
			} else if(devMode) {
				console.error(`create-label-html-data -> Поле ${item.title} не додано до масиву рядків`)
			}
		})
	} catch (error) {
		console.error("create-label-html-data -> Помилка у файлі формувння рядків", error)
	}
}
