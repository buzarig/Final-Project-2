import {
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR
} from "../actions/cartActions";

const initState = {
  cartProducts: []
};

const cartReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return {
        ...state,
        productsArray: [
          ...state.cartProducts.slice(0, action.payload),
          ...state.cartProducts.slice(action.payload + 1)
        ]
      };
    case ADD_PRODUCT: {
      const existingProductIndex = state.cartProducts.findIndex(
        (item) => item.product.itemNo === action.payload.productItem.itemNo
      );

      if (existingProductIndex !== -1) {
        const updatedProductsArray = [...state.cartProducts];
        updatedProductsArray[existingProductIndex].cartQuantity +=
          action.payload.quantity;

        return {
          ...state,
          cartProducts: updatedProductsArray
        };
      }
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          {
            product: action.payload.productItem,
            cartQuantity: action.payload.quantity
          }
        ]
      };
    }

    case INCREASE_COUNT:
      return {
        ...state,
        productsArray: state.productsArray.map((product, i) =>
          i === action.payload
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
    case DECREASE_COUNT:
      return {
        ...state,
        productsArray: state.productsArray.map((product, i) =>
          i === action.payload && product.cartQuantity > 1
            ? { ...product, cartQuantity: product.cartQuantity - 1 }
            : product
        )
      };

    case CLEAR:
      return {
        ...state,
        productsArray: []
      };
    default:
      return state;
  }
};

export default cartReducer;
