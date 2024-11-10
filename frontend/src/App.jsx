import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import MainPage from "./MainPage";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifiEmail from "./auth/VerifiEmail";
import HeroSection from "./comp/HeroSection";
import Profile from "./comp/Profile";
import SearchPage from "./comp/SearchPage";
import Restaurent from "./comp/Restaurent";
import Cart from "./comp/Cart";
import AdminRestaurent from "./admin/AdminRestaurent";
import AdminAddMenus from "./admin/AdminAddMenus";
import AdminOrder from "./admin/AdminOrder";
import Order from "./comp/Order";
import { useUserdata } from "./store/useUserdata";
import { useEffect } from "react";
import Load from "./comp/Load";

let appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search-page/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurent/:id",
        element: <Restaurent />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      // admin services started from here
      {
        path: "/admin/restaurent",
        element: <AdminRestaurent />,
      },
      {
        path: "/admin/addmenus",
        element: <AdminAddMenus />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrder />,
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verifi-email",
    element: <VerifiEmail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
function App() {
  let { checkAuth, isCheckingAuth, user } = useUserdata();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Load />;

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
