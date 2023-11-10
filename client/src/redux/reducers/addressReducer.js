import {
  COUTNRY_ADDRESS,
  STATE_ADDRESS,
  CITY_ADDRESS,
  CODE_ADDRESS,
  UPDATE_SHIPPING_INFO
} from "../actions/addressActions";

const initialState = {
  selectedCountry: null,
  selectedState: null,
  selectedCity: null,
  postalCode: ""
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUTNRY_ADDRESS:
      return { ...state, selectedCountry: action.country };
    case STATE_ADDRESS:
      return { ...state, selectedState: action.state };
    case CITY_ADDRESS:
      return { ...state, selectedCity: action.city };
    case CODE_ADDRESS:
      return { ...state, postalCode: action.postalCode };
    case UPDATE_SHIPPING_INFO:
      return { ...state, shippingInfo: action.payload };
    default:
      return state;
  }
};

export default addressReducer;
