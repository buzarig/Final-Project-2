import api from "../../http/api";
import types from "../types";

export function getAllProducts(products) {
  return {
    type: types.GET_ALL_PRODUCTS,
    payload: {
      products
    }
  };
}

export const getProductsArray = () => async (dispatch) => {
  try {
    const data = await api.get(`/products`).then((products) => products);
    console.log('redux', data.data);
    dispatch(getAllProducts(data.data));
  } catch (error) {
    console.log(error);
  }
};
