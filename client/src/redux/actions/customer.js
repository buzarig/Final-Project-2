import types from "../types";

export function getUserInfo(customer) {
  return {
    type: types.GET_USER_INFO,
    payload: {
      customer
    }
  };
}

export function removeUserInfo() {
  return {
    type: types.REMOVE_USER_INFO
  };
}

// собрать данные о юзере с signIn и передать в чекаут! добавить свойство стереть при выходе из акаунта!
// Собрать дані з корзини (країна, місто..)
