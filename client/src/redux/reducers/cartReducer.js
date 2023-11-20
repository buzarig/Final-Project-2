/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import {
  PRODUCTS_FROM_SERVER,
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  INCREASE_COUNT,
  DECREASE_COUNT
} from "../actions/cartActions";

import api from "../../http/api";

const initState = {
  cartProducts: []
};

const addToServer = async (data) => {
  try {
    const headers = {
      Authorization: data.payload.token
    };

    const response = await api.put(
      `/cart/${data.payload.productItem._id}`,
      null,
      {
        headers
      }
    );

    if (response.status === 200) {
      const cart = response.data;
      console.log("Данные о корзине:", cart);
    } else {
      console.log("Произошла ошибка при получении данных о корзине.");
    }
  } catch (error) {
    console.error("Ошибка при получении данных о корзине:", error);
  }
};

const removeFromServer = async (data) => {
  try {
    const headers = {
      Authorization: data.payload.token
    };

    const response = await api.delete(`/cart/${data.payload.productItem._id}`, {
      headers
    });

    if (response.status === 200) {
      console.log("Продукт успешно удален из корзины на сервере.");
    } else {
      console.log("Произошла ошибка при удалении продукта из корзины.");
    }
  } catch (error) {
    console.error("Ошибка при удалении продукта из корзины:", error);
  }
};

const decreaseFromServer = async (data) => {
  try {
    const headers = {
      Authorization: data.payload.token
    };

    const response = await api.delete(
      `/cart/product/${data.payload.productItem._id}`,
      {
        headers
      }
    );

    if (response.status === 200) {
      console.log("Продукт успешно удален из корзины на сервере.");
    } else {
      console.log("Произошла ошибка при удалении продукта из корзины.");
    }
  } catch (error) {
    console.error("Ошибка при удалении продукта из корзины:", error);
  }
};

const cartReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case PRODUCTS_FROM_SERVER: {
      const { products } = action.payload;

      console.log(products);
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          ...products.map((product) => ({
            product: product.product,
            cartQuantity: product.cartQuantity
          }))
        ]
      };
    }
    case REMOVE_PRODUCT: {
      const { productItem, itemNo, token } = action.payload;

      if (token) {
        removeFromServer({
          action: REMOVE_PRODUCT,
          payload: { productItem, token }
        });
      }

      return {
        ...state,
        cartProducts: [
          ...state.cartProducts.slice(0, itemNo),
          ...state.cartProducts.slice(itemNo + 1)
        ]
      };
    }
    case ADD_PRODUCT: {
      const { productItem, quantity, token } = action.payload;

      const existingProductIndex = state.cartProducts.findIndex(
        (item) => item.product.itemNo === productItem.itemNo
      );

      if (existingProductIndex !== -1) {
        return state;
      }

      if (token) {
        addToServer({
          action: ADD_PRODUCT,
          payload: { productItem, quantity, token }
        });
      }

      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          {
            product: productItem,
            cartQuantity: quantity
          }
        ]
      };
    }
    case INCREASE_COUNT: {
      const { productItem, token, itemNo } = action.payload;

      if (
        token &&
        productItem.quantity > state.cartProducts[itemNo].cartQuantity
      ) {
        addToServer({
          action: INCREASE_COUNT,
          payload: { productItem, token }
        });
      }

      return {
        ...state,
        cartProducts: state.cartProducts.map((product, i) =>
          i === itemNo
            ? {
                ...product,
                cartQuantity:
                  product.cartQuantity < product.product.quantity
                    ? product.cartQuantity + 1
                    : product.cartQuantity
              }
            : product
        )
      };
    }
    case DECREASE_COUNT: {
      const { productItem, token, itemNo } = action.payload;

      if (token && state.cartProducts[itemNo].cartQuantity > 1) {
        decreaseFromServer({
          action: DECREASE_COUNT,
          payload: { productItem, token }
        });
      }

      return {
        ...state,
        cartProducts: state.cartProducts.map((product, i) =>
          i === itemNo && product.cartQuantity > 1
            ? { ...product, cartQuantity: product.cartQuantity - 1 }
            : product
        )
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
