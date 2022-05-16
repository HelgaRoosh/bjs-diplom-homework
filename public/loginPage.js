"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {

    const callback = (response) => {
        console.log(response);
    
        if(!response.success) {
            userForm.setLoginErrorMessage(response.error);
        } else {
            location.reload();
        }
    }

ApiConnector.login(data, callback);
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
