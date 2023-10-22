/* eslint-disable default-param-last */
import types from "../types";

const initialState = {
  products: [],
  isLoading: true,
  endedProducts: 1
};

function merchandiseReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

export default merchandiseReducer;
