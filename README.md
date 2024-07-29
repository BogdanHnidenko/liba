# create-label-html-data

### Модуль для створення html структури етикеток
Створює структуру чеку яка буде передаватись на принтери етикеток

### Встановлення модуля та рообота з ним в проекті
1. Для встановлення пакету прописуємо в package.json
```
  create-label-html-data": "git+https://ansible:ansible_pass@git.skyservice.pro/skyservice/nodejs/bootstrap-vue.git#master
```
2. Для оновлення пакету прописуємо 
```
  npm install create-label-html-data
```
3. Імпортуємо в проект
```
  import labelPrintData from "create-label-html-data";
```
4. Додаємо данні для роботи
```
  const html = labelPrintData(obj, devMode)
```
obj - це обʼєкт данних, devMode - boolean змінна для додаткових повідомлень про помилки
```js
  obj = {
    product: {},      // Об'єкт товару
    dataPrinter: {},  // Об'єкт налаштувнь принтеру
    translate: {},    // Об'єкт перекладу
    func: {}          // Об'єкт з функціями
  }
```

### Робота з модулем
1. Створення основного файлу js
```
  npm run build
```

### Які обʼєкти очікуються
1. Об'єкт товару
```js
product: {
  name: "",             // Назва товару
  manufacturer: "",     // Виробник товару
  productType: "",      // Тип товару
  vendorCode: "",       // Код товару
  weight: "",           // Вага товару
  size: "",             // Розмір товару
  description: "",      // Опис товару
  barcode: {
    value: "",          // Значення штрихкоду
    type: ""            // Тип штрихкоду
  },
  price: "",            // Ціна товару
  currency: "",         // Валюта
  unit: ""              // Одиниця вимірювання
}
```
2. Об'єкт налаштувнь принтеру
```js
dataPrinter: {
  labelParams: {
    fields ["Поля для друку"] // Поля які треба друкувати
  },
  sizes: {
    barWidth: "",
    barcodeFont: "",
    barcodeHeight: "",
    dateTimeFont: "",
    density: "",
    descriptionFont: "",
    direction: "",
    dpi: "",
    gap: "",
    labelHeightMM: "",
    labelHeightPX: "",
    labelWidthMM: "",
    labelWidthPX: "",
    manufacturerFont: "",
    nameFont: "",
    nameLength: "",
    priceFont: "",
    sizeFont: "",
    typeFont: "",
    vendorCodeFont: "",
    weightFont: ""
  }
}
```
3. Об'єкт перекладу
```js
translate: {
  weight: "",     // Переклад для поля ваги
  size: "",       // Переклад для поля розмір
  price: "",      // Переклад для поля ціни
}
```
4. Об'єкт з функціями
```js
func: {
  currencyFormatted: ()=>{},    // Форматування цифр в 2 цифри після коми
  unit: ()=>{},                 // Переклади одиниць виміру
}
```