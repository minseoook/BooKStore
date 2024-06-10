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
    </div>
  );
}

export default App;
