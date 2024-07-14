// ----------------- Модуль формування рядків для принтера етикеток ---------------------------
// Об'єкт продукту який потрібен для формування рядків
// {
// 	name: '',
// 	manufacturer: '',
// 	productType: '',
// 	vendorCode: '', 
// 	weight: '',
// 	size: '',
// 	description: '',
// 	barcode: {
// 		value: '', 
// 		type: ''
// 	},
// 	price: '',
// 	currency: '',
// 	unit: '',
// }

import { currencyFormatted } from '@/modules/formatValues.js'; // Модуль, який форматує цифри з двома знаками після коми
import unit from "@/modules/unit.js" // модуль для перекладу одиниць виміру
export function formDataForLabelPrinter (product, data) {
	// Налаштування принтера етикеток
	const dataPrinter = data;
	// Масив полів які треба друкувати
	const fieldsOption = dataPrinter?.labelParams?.fields || [];
	// Масив для певного порядку розташування полів
	const fieldsForWrap = ['productType','vendorCode', 'weight', 'size'].filter(item => fieldsOption.includes(item) && !!product[item])
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
  // Масив рядків для відправки на друк
	let stringsArr = []
	// ----------------- Перевіряємо поля які треба друкувати -------------------------------------
	// Поле назви товару
	let name = fieldsOption.includes('name') && !!product.name ? {
		value: product.name, // Значення поля
		align:  "center", // Розміщення на етикетці
		fontSize: setSize(dataPrinter?.sizes?.nameFont, 0.8) // Значення шрифту
	} : null;
  // Якщо таке поле є то додаємо до масиву рядків на друк
	if(name) stringsArr.push(name)
	// ------------------ Поля, які відображаються при ювелірному шаблоні ---------------------
	if(dataPrinter?.labelParams?.template === "jewelry_mini"){
		// Поле виробника товару
		let manufacturer = fieldsOption.includes('manufacturer') && !!product.manufacturer ? {
			value: product.manufacturer, // Значення поля
			align: "center", // Розміщення поля
			fontSize: setSize(dataPrinter?.sizes?.manufacturerFont, 0.8), // Шрифт поля
		} : null
		if(manufacturer) stringsArr.push(manufacturer) // Якщо таке поле є, то додаємо до масиву рядків на друк

		// ------------------  Об'єкт полів які розташовані по краях ---------------------
		const wrapFieldsElements = {
			type: 'wrap', // Тип об'єкту
			// Масив з полями
			items: [
				// Поле типу товару
				fieldsOption.includes('productType') && !!product.productType ? {
					value: product.productType, // Значення поля
					align: setTextAlign('productType'), // Розміщення тексту
					fontSize: setSize(dataPrinter?.sizes?.typeFont, 0.8), // Шрифт поля
				} : null,
				// Поле артикля товару
				fieldsOption.includes('vendorCode') && !!product.vendorCode ? {
					value: product.vendorCode, // Значення поля
					align: setTextAlign('vendorCode'), // Розміщення тексту
					fontSize: setSize(dataPrinter?.sizes?.vendorCodeFont, 0.8), // Шрифт поля
				} : null,
				// Поле ваги товару
				fieldsOption.includes('weight') && !!product.weight ? {
					value: `${lang["ves"]}: ${product.weight + unit(product.unit)}`, // Значення поля
					align: setTextAlign('weight'), // Розміщення тексту
					fontSize: setSize(dataPrinter?.sizes?.weightFont, 0.8), // Шрифт поля
				} : null,
				// Поле розміру товару
				fieldsOption.includes('size') && !!product.size ? {
					value: `${lang["size"]}: ${product.size}`, // Значення поля
					align: setTextAlign('size'), // Розміщення тексту
					fontSize: setSize(dataPrinter?.sizes?.sizeFont, 0.8), // Шрифт поля
				} : null
			].filter(item => item)
		}
		// Якщо масив, який розташовує рядки по краях не порожній, то додаємо до масиву рядків на друк
		if(wrapFieldsElements?.items.length > 0 ) stringsArr.push(wrapFieldsElements)
	}
	// ------------------------- Поле опису товару --------------------------------
	let description = fieldsOption.includes('description') && !!product.description ? {
		value: product.description, // Значення поля
		align: 'center', // Розміщення тексту
		fontSize: setSize(dataPrinter?.sizes?.descriptionFont, 0.4) // Шрифт поля
	} : null;
  // Якщо таке поле є, то додаємо до масиву рядків на друк
	if(description) stringsArr.push(description)
	// ------------------------ Поле дати та часу товару --------------------------------
	if(fieldsOption.includes('date')){
		// Створюємо нову дату
		let fullDate = currentDate('d-m-y')
		// Перевіряємо чи є поле часу
		if(fieldsOption.includes('time')){
			const time = currentTime()
			fullDate = fullDate + ' ' + time;
		}
		let date = {
			value: fullDate, // Значення поля
			align: "center", // Розміщення поля
			fontSize: setSize(dataPrinter?.sizes?.dateTimeFont, 0.5), // Шрифт поля
		}
    // Якщо таке поле є, то додаємо до масиву рядків на друк
		stringsArr.push(date)
	}
	// --------------------------- Поле штрих-коду товару --------------------------------
	let barcode = fieldsOption.includes('barcode') && !!product?.barcode?.value ? {
		title: 'barcode', // Назва поля
		barcodeType: product?.barcode?.type || "EAN13", // Тип штрихкоду
		value: product?.barcode?.value || "", // Значення поля
		fontSize: (checkTemplate(dataPrinter?.sizes?.barcodeFont) ? dataPrinter.sizes.barcodeFont : 20) * 1.5, // Шрифт поля
		width: checkTemplate(dataPrinter?.sizes?.barWidth) ? parseFloat(dataPrinter.sizes.barWidth) : 3, // Ширина штрихкоду
		height: setSize(dataPrinter?.sizes?.barcodeHeight, 30) // Висота штрихкоду
	} : null;
	if(barcode) stringsArr.push(barcode) // Якщо таке поле є, то додаємо до масиву рядків на друк
	// -------------------------- Поле ціни товару --------------------------------
	let price = fieldsOption.includes('price') && !!product.price ? {
		align:  "space-between", // Розташування
		valueName: lang["tsena"] + ":", // Значення поля
		valuePrice: currencyFormatted(product?.price), // Значення поля
		valueUnit: product?.currency + (product.unit ? "/" + unit(product.unit) : ""), // Значення поля
		fontSize: setSize(dataPrinter?.sizes?.priceFont, 0.8), // Шрифт поля
	} : null;
  // Якщо таке поле є то, додаємо до масиву рядків на друк
	if(price) stringsArr.push(price)
  // Якщо є рядки на друк, то повертаємо їх
	if(stringsArr.length > 0) return stringsArr
	return
}
