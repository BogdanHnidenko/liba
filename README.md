# create-label-html-data

## Модуль для створення html структури етикеток

1. Для встановлення прописуємо в package.json
  ```
    "create-label-html-data": "git+https://ansible:ansible_pass@git.skyservice.pro/skyservice/nodejs/bootstrap-vue.git#master",
  ```


## Які обʼєкти очікуються
1. Об'єкт товару
```json
  {
    "name": "",             // Назва товару
    "manufacturer": "",     // Виробник товару
    "productType": "",      // Тип товару
    "vendorCode": "",       // Код товару
    "weight": "",           // Вага товару
    "size": "",             // Розмір товару
    "description": "",      // Опис товару
    "barcode": {
      "value": "",          // Значення штрихкоду
      "type": ""            // Тип штрихкоду
    },
    "price": "",            // Ціна товару
    "currency": "",         // Валюта
    "unit": ""              // Одиниця вимірювання
  }
```
2. run container, wait few moments, enjoy develop)))
  ```
    docker run -d -p 8010:80 -v /path/to/skyservice-pos-vue:/app pos
  ```