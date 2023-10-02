/* eslint-disable default-param-last */
import types from "../types"; // Импортируйте типы действий

const initialState = {
  searchToggle: false
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SEARCH:
      return {
        ...state,
        searchToggle: action.payload
      };

    default:
      return state;
  }
};

export default searchReducer;
