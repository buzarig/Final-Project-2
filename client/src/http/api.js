import axios from "axios";

const api = axios.create({
  mode: "no-cors",
  baseURL: "https://final-project-backend-snpn.onrender.com/api"
});

export const setAuthorizationHeader = (token) => {
  if (token) {
    api.defaults.headers.authorization = token.replace("Bearer ", "");
  } else {
    delete api.defaults.headers.authorization;
  }
};

export default api;
