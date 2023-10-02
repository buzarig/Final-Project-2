export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

export default function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: token
  };
}
