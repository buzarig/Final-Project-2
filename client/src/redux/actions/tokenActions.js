import types from "../types";

export default function setAccessToken(token) {
  return {
    type: types.SET_ACCESS_TOKEN,
    payload: token
  };
}
