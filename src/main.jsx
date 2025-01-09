// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/index.css";

import api from "./services/api"; // your axios instance
import { setUserFromStorage } from "./redux/slices/userSlice";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user"); // stored as JSON string

if (token) {
  // Set token as default Authorization header
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // If you trust localStorage user data, dispatch directly:
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      store.dispatch(
        setUserFromStorage({
          token,
          user: parsedUser,
        })
      );
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.removeItem("user");
    }
  }

  // Alternatively, you might want to verify token with the backend:
  // api.get("/users/me")
  //   .then(res => {
  //     store.dispatch(
  //       setUserFromStorage({
  //         token,
  //         user: res.data
  //       })
  //     );
  //   })
  //   .catch(err => {
  //     console.error("Token invalid, removing from storage:", err);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //   });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
