import types from "../types";

const initialState = {
  accessToken: null
};

const tokenReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload
      };
    case types.REMOVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: null
      };
    default:
      return state;
  }
};

export default tokenReducer;
