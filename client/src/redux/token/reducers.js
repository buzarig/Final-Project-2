import { SET_ACCESS_TOKEN } from "./action";

const initialState = {
  accessToken: null
};

const tokenReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload
      };
    default:
      return state;
  }
};

export default tokenReducer;
