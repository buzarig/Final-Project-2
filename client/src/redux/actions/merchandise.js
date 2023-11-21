/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import api from "../../http/api";
import types from "../types";

export function getAllProducts(products, isLoading, endedProducts) {
  return {
    type: types.GET_ALL_PRODUCTS,
    payload: {
      products,
      isLoading,
      endedProducts
    }
  };
}

export const getFilteredProducts =
  (
    products,
    valueSliderMin,
    valueSliderMax,
    shopOptions,
    sortOptions,
    checkedSale,
    checkedStock,
    currentPage
  ) =>
  async (dispatch) => {
    try {
      const stones = shopOptions ? shopOptions.split(",") : [];
      const data = await api
        .get(
          `/products/filter?minPrice=${valueSliderMin}&maxPrice=${valueSliderMax}${
            stones.length ? `&stone=${stones}` : ""
          }${checkedSale ? "&previousPrice=*" : ""}${
            checkedStock ? "&inStock=true" : ""
          }&perPage=6&startPage=${currentPage}${
            sortOptions && `&sort=${sortOptions}currentPrice`
          }`
        )
        .then((response) => response);
      dispatch(
        getAllProducts(
          currentPage === 1 ? data.data.data : [...products, ...data.data.data],
          false,
          data.data.data.length
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

export const getSearchProducts = (valueSearch) => async (dispatch) => {
  try {
    if (valueSearch != "") {
      const data = await api
        .post(`/products/search`, { query: valueSearch })
        .then((products) => products);
      dispatch(getAllProducts(data.data, false, 1));
    }
  } catch (error) {
    console.error(error);
  }
};
