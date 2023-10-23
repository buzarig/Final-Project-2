import {
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR
} from "../actions/cartActions";
import types from "../types";


const initState = {
  cartProducts: []
};

const cartReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts.slice(0, action.payload),
          ...state.cartProducts.slice(action.payload + 1)
        ]
      };
    case ADD_PRODUCT: {
      const existingProductIndex = state.cartProducts.findIndex(
        (item) => item.product.itemNo === action.payload.productItem.itemNo
      );

      if (existingProductIndex !== -1) {
        const updatedCartProducts = [...state.cartProducts];
        updatedCartProducts[existingProductIndex].cartQuantity +=
          action.payload.quantity;

        return {
          ...state,
          cartProducts: updatedCartProducts
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

    case types.INCREASE_COUNT:
      return {
        ...state,
        cartProducts: state.cartProducts.map((product, i) =>  
        i === action.payload
          
            ? {
                ...product,
                cartQuantity:
                  product.cartQuantity < product.quantity
                    ? product.cartQuantity + 1
                    : product.cartQuantity
              }
            : product
          
        )
      };
      case types.DECREASE_COUNT:
        return {
          ...state,
          cartProducts: state.cartProducts.map((product, i) =>
            i === action.payload && product.cartQuantity > 1
              ? { ...product, cartQuantity: product.cartQuantity - 1 }
              : product
          )
        };
    case CLEAR:
      return {
        ...state,
        cartProducts: []
      };
    default:
      return state;
  }
};

export default cartReducer;
