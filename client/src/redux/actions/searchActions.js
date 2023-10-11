import types from "../types";

const searchToggle = (value) => ({
  type: types.TOGGLE_SEARCH,
  payload: value
});

export default searchToggle;
