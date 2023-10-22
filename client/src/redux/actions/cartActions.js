export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const CLEAR = "CLEAR";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const removeProduct = (itemNo) => ({
  type: REMOVE_PRODUCT,
  payload: itemNo
});

export const addProductToCart = (productItem, quantity) => ({
  type: ADD_PRODUCT,
  payload: { productItem, quantity }
});

export const increaseCount = (itemNo) => ({
  type: INCREASE_COUNT,
  payload: itemNo
});

export const decreaseCount = (itemNo) => ({
  type: DECREASE_COUNT,
  payload: itemNo
});

export const clear = () => ({
  type: CLEAR
});
