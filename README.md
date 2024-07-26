# create-label-html-data

### Модуль для створення html структури етикеток

1. Для встановлення прописуємо в package.json
```
  "create-label-html-data": "git+https://ansible:ansible_pass@git.skyservice.pro/skyservice/nodejs/bootstrap-vue.git#master",
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
  currencyFormatted: ()=>{},    // Назва товару
  unit: ()=>{},                 // Виробник товару
}
```