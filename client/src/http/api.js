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

// TOKEN

// const token = useSelector((state) => state.accessToken);

// useEffect(() => {
//   setAuthorizationHeader(token);
// }, [token]);

// example

// async function getProducts() {
//   try
//     const response = await api.get("/customers/customer");

//     if (response.status === 200) {
//       const customer = response.data;
//       console.log("Данные о пользователе:", customer);
//     } else {
//       console.log("Произошла ошибка при получении данных о пользователе.");
//     }
//   } catch (error) {
//     console.error("Ошибка при получении данных о пользователе:", error);
//   }
// }
