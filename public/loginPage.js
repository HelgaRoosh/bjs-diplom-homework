"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {// функция, которая будет выполняться при попытке авторизации

    const callback = (response) => {//почему работает только стрелочной?
        console.log(response);
    
        if(!response.success) {
            userForm.setLoginErrorMessage(response.error);//выводит сообщение с ошибкой при авторизации.В случае провала запроса выведите ошибку в окно для ошибок.
        } else {
            location.reload();//В случае успеха запроса обновите страницу
        }
    }

ApiConnector.login(data, callback);//ApiConnector.login({ login, password }, callback) — запрос на авторизацию пользователя
};

userForm.registerFormCallback = function(data) {
    const callback = (response) => {
        console.log(response);

        if(!response.success) {
            userForm.setRegisterErrorMessage(response.error);
        } else {
            location.reload();
        }
    }

ApiConnector.register(data, callback);
};

/*
ответ от сервера:
{success: true, data: {…}}
    data: {created_at: '2022-05-11T20:47:44.098Z', login: 'vulfina@mail.ru', password: 'demo', id: 6, balance: {…}}
    success: true
[[Prototype]]: Object
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    __proto__: (…)
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__() 
    
ИЛИ 
{success: false, error: 'Пользователь c логином vulfina@mail.ru и указанным паролем не найден'}
    error: "Пользователь c логином vulfina@mail.ru и указанным паролем не найден"
    success: false
[[Prototype]]: Object
*/