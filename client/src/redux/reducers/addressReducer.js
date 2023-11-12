/* eslint-disable default-param-last */
import { UPDATE_SHIPPING_INFO } from "../actions/addressActions";

const initialState = {
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  postCode: ""
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default shippingReducer;
