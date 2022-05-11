"use strict"

const exit = new LogoutButton();
exit.action = () => {
   ApiConnector.logout((callback) => {
      if (callback.success) {
         location.reload();
      }
   });
};
