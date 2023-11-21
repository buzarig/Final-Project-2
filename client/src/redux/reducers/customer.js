import types from "../types";

const initialState = {
  customer: {}
};

function customerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER_INFO:
      return {
        ...action.payload
      };
    case types.REMOVE_USER_INFO:
      return {
        state
      };
    default:
      return state;
  }
}

export default customerReducer;
