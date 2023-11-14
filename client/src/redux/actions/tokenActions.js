import types from "../types";

export default function setAccessToken(token) {
  return {
    type: types.SET_ACCESS_TOKEN,
    payload: token
  };
}
export const removeAccessToken = () => ({
  type: types.REMOVE_ACCESS_TOKEN
});
