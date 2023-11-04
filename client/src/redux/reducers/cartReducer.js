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
        cartProducts: [
          ...state.cartProducts.slice(0, action.payload),
          ...state.cartProducts.slice(action.payload + 1)
        ]
      };
    case ADD_PRODUCT: {
      const productToAdd = action.payload.productItem;
      const quantityToAdd = action.payload.quantity;

      const existingProductIndex = state.cartProducts.findIndex(
        (item) => item.product.itemNo === productToAdd.itemNo
      );

      if (existingProductIndex !== -1) {
        return state;
      }

      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          {
            product: productToAdd,
            cartQuantity: quantityToAdd
          }
        ]
      };
    }

    case INCREASE_COUNT:
      return {
        ...state,
        cartProducts: state.cartProducts.map((product, i) =>
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
