// ----------------- Модуль формування html структури для принтера етикеток ---------------------------
import JsBarcode from 'jsbarcode'; // бібліотека для генерації штрих-коду
// Функція задання стилів для етикетки
const labelStyle = (item) => {
	return {
		// Стилі для контейнера етикетки
		container: item && {
			width: `${item.labelWidthPX}px`,
			height: `${item.labelHeightPX}px`,
			overflow: 'hidden',
			padding: '5px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			fontFamily: 'Helvetica Neue, Helvetica, Tahoma, sans-serif',
			lineHeight: '1',
		},
		// Стилі для полів які розташовані по ценру
		centerItem: item && {
			textAlign: 'center',
			width: '90%',
			marginTop: '5px',
			wordBreak: 'break-all',
			fontSize: `${item.fontSize}em`,
		},
		// Стилі для полів які розташовані по краям
		wrapItem:{
			// Для контейнера
			divElement: {
				display: 'flex',
				flexWrap: 'wrap',
				width: '90%',
			},
			// Для кожного поля
			spanElement: item && {
				width: '50%',
				textAlign: item.align,
				fontSize: `${item.fontSize}em`,
			}
		},
		// Стилі для штрихкоду
		barcode: {
			textAlign: 'center',
			width: '90%',
		},
		// Стилі для поля з ціною
		priceContainer: item && {
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			width: '90%',
			fontSize: `${item.fontSize}em`,
			textAlign: 'center',
		}
	}
}
// Функція для генерації штрихкоду
const createBarcode = (item)=> {
  // Контейнер штрих-коду
	const barcodeContainer = document.createElement('div');
	// Отримуємо стилі для контейнера штрихкоду
	const style = labelStyle().barcode
	Object.assign(barcodeContainer.style, style)
	// Створюємо SVG елемент для штрих-коду
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	// Генеруємо штрих-код за допомогою JsBarcode
	JsBarcode(svgElement, item.value, {
		format: item.barcodeType, // Формат штрих-коду
		width: item.width, // Ширина штрих-коду
		height: item.height, // Висота штрих-коду
		fontSize: item.fontSize, // Розмір тексту штрих-коду
		displayValue: true // Відображення значення штрих-коду під ним
	});
  // Додаємо SVG до контейнера штрихкоду
	barcodeContainer.appendChild(svgElement);
	return barcodeContainer
}
// Функція для створення контейнера з полями які повинні бути по боках
const createWrapContainer = (obj)=> {
  // Контейнер поля
	const divElement = document.createElement('div');
	// Отримуємо стилі для контейнера поля
	const styleDiv = labelStyle().wrapItem.divElement
	Object.assign(divElement.style, styleDiv)
	// Проходимось по всім елементам
	for(let string of obj.items){
    // Блок поля з розташуванням тексту в ньому
		const span = document.createElement('span');
		span.textContent = string.value;
		// Отримуємо стилі для контейнера етикеток
		const styleSpan = labelStyle(string).wrapItem.spanElement
		Object.assign(span.style, styleSpan)
		divElement.appendChild(span);
	}
	return divElement
}
// Функція для створення HTML структури етикетки
export default (strings, data) => {
	try {
		// Налаштування розмірів етикеток
		const dataSize = data.sizes;
		// Контейнер етикетки
		const labelContainer = document.createElement('div');
		// Задаємо id контейнеру
		labelContainer.setAttribute('id', 'downimg');
		// Отримуємо стилі для контейнера етикеток
		const containerStyle = labelStyle(dataSize).container
		Object.assign(labelContainer.style, containerStyle)
		// Проходимось по масиву рядків для відображення
		for(let item of strings){
			// Якщо це штрихкод
			if(item.title === 'barcode'){
				// Створюємо html структуру штрих-коду
				const barcodeElement = createBarcode(item);
				// Додаємо до контейнера етикетки
				labelContainer.appendChild(barcodeElement);
			// Якщо це рядки, які повинні бути по центру
			} else if(item.align === 'center'){
				// Контейнер поля
				const divElement = document.createElement('div');
				divElement.textContent = item.value;
				// Отримуємо стилі для полів що розташовані по центру
				const style = labelStyle(item).centerItem
				Object.assign(divElement.style, style)
				// Додаємо до контейнера етикетки
				labelContainer.appendChild(divElement);
			// Якщо це рядки, які повинні бути по боках
			} else if(item.type === 'wrap'){
				const divElementWrap = createWrapContainer(item);
				// Додаємо до контейнера етикетки
				labelContainer.appendChild(divElementWrap);
				// Якщо це ціна товару
			} else if(item.align === 'space-between'){
				// Контейнер поля ціни
				const divElement = document.createElement('div');
				// Отримуємо стилі для поля ціни
				const stylePrice = labelStyle(item).priceContainer
				Object.assign(divElement.style, stylePrice)
				// HTML розмітка для поля ціни
				const spanElementName = `
					<span>${item.valueName}</span>
					<span>
						<span style="font-weight: 700;">${item.valuePrice}</span>
						<span style="padding-left: 5px;">${item.valueUnit}</span>
					</span>
				`
				divElement.innerHTML = spanElementName
				// Додаємо до контейнера етикетки
				labelContainer.appendChild(divElement);
			}
		}
		return labelContainer
	} catch (error) {
		console.error("create-label-html-data -> Помилка у файлі формувння html", error)
	}
}
