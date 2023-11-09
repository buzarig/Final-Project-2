export const COUTNRY_ADDRESS = "COUTNRY_ADDRESS";
export const STATE_ADDRESS = "STATE_ADDRESS";
export const CITY_ADDRESS = "CITY_ADDRESS";
export const CODE_ADDRESS = "CODE_ADDRESS";

export const countryAddress = (country) => {
  return { type: COUTNRY_ADDRESS, country };
};

export const stateAddress = (state) => {
  return { type: STATE_ADDRESS, state };
};

export const cityAddress = (city) => {
  return { type: CITY_ADDRESS, city };
};

export const codeAddress = (code) => {
  return { type: CODE_ADDRESS, code };
};
