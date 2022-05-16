"use strict"

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


const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
   if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
   };
   console.log(response);
});

favoritesWidget.addUserCallback = (data) => {
   ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success) {
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
         favoritesWidget.setMessage(true, 'Добавление успешно');
      } else {
         favoritesWidget.setMessage(false, response.error);
      };
      console.log(response);
   });
};

favoritesWidget.removeUserCallback = (data) => {
   ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success) {
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
         favoritesWidget.setMessage(true, 'Удаление успешно');
      } else {
         favoritesWidget.setMessage(false, response.error);
      };
      console.log(response);
   });
};
