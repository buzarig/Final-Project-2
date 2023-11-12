export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const CLEAR = "CLEAR";

export const removeProduct = (productItem, itemNo, token) => ({
  type: REMOVE_PRODUCT,
  payload: { productItem, itemNo, token }
});

export const addProductToCart = (productItem, quantity, token) => ({
  type: ADD_PRODUCT,
  payload: { productItem, quantity, token }
});

export const increaseCount = (productItem, itemNo, token) => ({
  type: INCREASE_COUNT,
  payload: { productItem, itemNo, token }
});

export const decreaseCount = (productItem, itemNo, token) => ({
  type: DECREASE_COUNT,
  payload: { productItem, itemNo, token }
});

export const clear = (token) => ({
  type: CLEAR,
  payload: { token }
});
