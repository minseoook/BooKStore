import { useContext, useEffect } from "react";
import "./App.css";
import { ThemeContext } from "./context/themeContext";

import Layout from "./layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Error from "./pages/Error/Error";
import Books from "./pages/Books/Books";
import { useAuthStore } from "./store/authStore";
import { jwtDecode } from "jwt-decode";
import { refresh } from "./api/auth.api";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import BookDetail from "./pages/BookDetail/BookDetail";
import Carts from "./pages/Carts/Carts";
import Order from "./pages/Order/Order";
import Admin from "./pages/Admin/Admin";
import AddBook from "./pages/Admin/AddBook/AddBook";
import ToastContainer from "./components/Toast/ToastContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/resetPassword",
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: "/carts",
    element: (
      <Layout>
        <Carts />
      </Layout>
    ),
  },
  {
    path: "/order",
    element: (
      <Layout>
        <Order />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
  {
    path: "/admin/addBook",
    element: (
      <Layout>
        <AddBook />
      </Layout>
    ),
  },
]);
function App() {
  const { theme } = useContext(ThemeContext);
  const { token, logoutAction, loginAction } = useAuthStore();

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        const currentDate = new Date();
        const decodedToken = jwtDecode(token);

        if (decodedToken && decodedToken.exp) {
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            try {
              const data = await refresh();
              loginAction(data.accessToken);
            } catch (error) {
              logoutAction();
            }
          }
        } else {
          logoutAction();
        }
      } else {
        logoutAction();
      }
    };

    checkTokenValidity();
  }, [token, loginAction, logoutAction]);

  return (
    <div data-theme={theme} className="app-container">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
