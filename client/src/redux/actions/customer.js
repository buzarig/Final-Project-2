import api from "../../http/api";
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

export const requestUserInfo = (token) => async (dispatch) => {
  const headers = {
    Authorization: token
  };

  api
    .get("/customers/customer", {
      headers
    })
    .then((anotherResponse) => {
      if (anotherResponse.status === 200) {
        dispatch(getUserInfo(anotherResponse.data));
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    });
};
