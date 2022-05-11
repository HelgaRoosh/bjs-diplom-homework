"use strict"

let userForm = new UserForm();
userForm.loginFormCallback = function(data) {// функция, которая будет выполняться при попытке авторизации

    /*data (объект, который содержит логин и пароль, введённые в форму, и который будет передаваться внутри loginFormAction).
Функция должна выполнять запрос на сервер для попытки авторизации пользователя 
(авторизацию пользователя выполняйте с помощью ApiConnector.login).
Передайте в запрос авторизации функцию, которая будет выполняться при попытке авторизации. */
    let callback = (response) => {//почему работает только стрелочной?
        console.log(response);
        //Посмотрите в консоли, какой объект возвращает сервер. {success: true, userId: "1"}/false, data:'не найден'
        if(!response.success) {//Проверьте успешность запроса.
            this.setLoginErrorMessage(response.error);//??выводит сообщение с ошибкой при авторизации.В случае провала запроса выведите ошибку в окно для ошибок.
        } else {
            location.reload();//В случае успеха запроса обновите страницу (с помощью location.reload();).
        }
    }

ApiConnector.login(data, callback);//ApiConnector.login({ login, password }, callback) — запрос на авторизацию пользователя
}

