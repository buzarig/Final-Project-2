/* eslint-disable default-param-last */
import types from "../types";

const initialState = {
  products: []
};

export function merchandiseReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}