"use strict"
//npm start для запуска сервера
//const { response } = require("express");

/*
ответ от сервера - пользователь:
Object
data: {created_at: '2019-10-15T05:28:25.593Z', login: 'oleg@demo.ru', password: 'demo', id: 1, balance: {…}}
success: true
[[Prototype]]: Object 
*/

const exit = new LogoutButton();//выход
exit.action = () => {
   ApiConnector.logout((response) => {
      if (response.success) {
         location.reload();
      }
      
   });
};

new ProfileWidget();
//почему const profileWidget = new ProfileWidget(); не работает с profileWidget.showProfile(response.data);?
//У профиля статический метод. Объект создавать не нужно
ApiConnector.current((response) => {//получение инф о пользователе
   if (response.success) {
      ProfileWidget.showProfile(response.data);
   }
   console.log(response);
});

function funcRatesBoard() { 
   const tableBody = new RatesBoard();
   ApiConnector.getStocks((response) => {
      if (response.success) {
         tableBody.clearTable();
         tableBody.fillTable(response.data);
      }
      console.log(response);
   }); 
}
funcRatesBoard();
setInterval(funcRatesBoard, 60000);

/*
ответ от сервера - курсы валют:
Object
   data: {RUB_USD: 65.7916, RUB_EUR: 68.7835, RUB_NTC: 8.8095, USD_RUB: 0.0152, USD_EUR: 0.9565, …}
   success: true
[[Prototype]]: Object 
*/

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
   ApiConnector.addMoney(data, (response) => {      
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, 'Пополнение баланса успешно');
      } else {
         moneyManager.setMessage(false, response.error);
      }
      console.log(response);
   });
};

moneyManager.conversionMoneyCallback = (data) => {
   ApiConnector.convertMoney(data, (response) => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертирование успешно');
   } else {
      moneyManager.setMessage(false, response.error);
   }
   console.log(response);
   });
};

moneyManager.sendMoneyCallback = (data) => {
   ApiConnector.transferMoney(data, (response) => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод валюты успешен');
   } else {
      moneyManager.setMessage(false, response.error);
   }
   console.log(response);
   });
};

