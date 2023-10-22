import types from "../types";

export const removeProduct = (itemNo) => ({
  type: types.REMOVE_PRODUCT,
  payload: itemNo
});

export const addProductToCart = (productItem, quantity) => ({
  type: types.ADD_PRODUCT,
  payload: { productItem, quantity }
});

export const increaseCount = (itemNo) => ({
  type: types.INCREASE_COUNT,
  payload: itemNo
});

export const decreaseCount = (itemNo) => ({
  type: types.DECREASE_COUNT,
  payload: itemNo
});

export const clear = () => ({
  type: types.CLEAR
});
