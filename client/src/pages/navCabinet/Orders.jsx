// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import api from "../../http/api";

// function Orders() {
//   // const [userName, setUserName] = useState("");
//   // const [orders, setOrders] = useState([]);
//   // const [surname, setSurname] = useState(""); // Добавлено
//   // const [userEmail, setUserEmail] = useState(""); // Добавлено
//   // const [userLogin, setUserLogin] = useState(""); // Добавлено
//   // const [currentPassword, setCurrentPassword] = useState(""); // Добавлено

//   // const token = useSelector((state) => state.token.accessToken);

//   // async function fetchData() {
//   //   try {
//   //     const response = await api.get("/customers/customer", {
//   //       headers: {
//   //         Authorization: token
//   //       }
//   //     });

//   //     if (response.status === 200) {
//   //       const dataResponse = response.data;
//   //       setUserName(dataResponse.firstName);
//   //       setSurname(dataResponse.lastName);
//   //       setUserEmail(dataResponse.email);
//   //       setUserLogin(dataResponse.login);
//   //       setCurrentPassword("");
//   //     } else {
//   //       console.log("Error when retrieving user data:", response.status);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // }

//   // async function fetchOrders() {
//   //   try {
//   //     // Реализуйте логику получения заказов из API
//   //     // Например: const ordersResponse = await api.get("/orders");
//   //     // Затем установите заказы в состояние: setOrders(ordersResponse.data);
//   //   } catch (error) {
//   //     console.error("Error fetching orders:", error);
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchData();
//   // }, [fetchData]);

//   // useEffect(() => {
//   //   fetchOrders();
//   // }, [token]);

//   return (
//     <div>
//       {orders.length > 0 ? (
//         <ul className="orders-list">
//           {orders.map((order) => (
//             <li key={order.id}>
//               <p className="orders-text">ORDER NUMBER: {order.orderNumber}</p>
//               <p className="orders-text">DATE: {order.date}</p>
//               <p className="orders-text">STATUS: {order.status}</p>
//               <p className="orders-text">TOTAL: {order.total}</p>
//               <p className="orders-text">ACTIONS</p>
//               <p className="orders-link">
//                 <Link to={`/order/${order.id}`}>View Order</Link>
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className="orders-block">
//           <p className="orders-text">No order has been made yet.</p>
//           <p className="orders-link">
//             <Link to="/catalog">Browse Product</Link>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;
