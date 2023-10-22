import api from "../../http/api";
import types from "../types";

export function getAllProducts(products, isLoading) {
  return {
    type: types.GET_ALL_PRODUCTS,
    payload: {
      products,
      isLoading
    }
  };
}

export const getFilteredProducts = () => async (dispatch) => {
  try {
    const data = await api.get(`/products`).then((products) => products);
    console.log('redux', data.data);
    const isLoading = false;
    dispatch(getAllProducts(data.data, isLoading));
  } catch (error) {
    console.log(error);
  }
};
