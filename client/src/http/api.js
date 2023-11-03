import axios from "axios";

const api = axios.create({
  mode: "no-cors",
  baseURL: "https://final-project-backend-snpn.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const token = localStorage.getItem("token") || null;

  if (token) {
    newConfig.headers.authorization = token.replace("Bearer ", "");
  } else {
    delete newConfig.headers.authorization;
  }

  return newConfig;
});

export default api;

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
