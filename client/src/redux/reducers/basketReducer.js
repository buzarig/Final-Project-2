import types from "../types";

const initState = {
  productsArray: []
};

const basketReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case types.REMOVE_PRODUCT:
      return {
        ...state,
        productsArray: [
          ...state.productsArray.slice(0, action.payload),
          ...state.productsArray.slice(action.payload + 1)
        ]
      };
    case types.ADD_PRODUCT: {
      const existingProductIndex = state.productsArray.findIndex(
        (item) => item.product.itemNo === action.payload.productItem.itemNo
      );

      if (existingProductIndex !== -1) {
        const updatedProductsArray = [...state.productsArray];
        updatedProductsArray[existingProductIndex].cartQuantity +=
          action.payload.quantity;

        return {
          ...state,
          productsArray: updatedProductsArray
        };
      }
      return {
        ...state,
        productsArray: [
          ...state.productsArray,
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
    case types.DECREASE_COUNT:
      return {
        ...state,
        productsArray: state.productsArray.map((product, i) =>
          i === action.payload && product.cartQuantity > 1
            ? { ...product, cartQuantity: product.cartQuantity - 1 }
            : product
        )
      };

    case types.CLEAR:
      return {
        ...state,
        productsArray: []
      };
    default:
      return state;
  }
};

export default basketReducer;
