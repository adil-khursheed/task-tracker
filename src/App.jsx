import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeState } from "./contexts/themeContext";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  const { theme } = ThemeState();

  return (
    <>
      <header className="w-full h-64">
        <img
          src={
            theme === "dark" ? "/bg-desktop-dark.jpg" : "/bg-desktop-light.jpg"
          }
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </header>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
