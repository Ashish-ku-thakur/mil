import {
  createBrowserRouter,
  Navigate,
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

// donn't get to go any routes expects to login
let ProtectedRoute = ({ children }) => {
  let { isAuthenticated, user } = useUserdata();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

// is already have an account and cookis then donn't go to login take him to main page
let AuthenticatedUser = ({ children }) => {
  let { isAuthenticated, user } = useUserdata();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

let AdminUser = ({ children }) => {
  let { isAuthenticated, user } = useUserdata();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

let appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
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
        element: (
          <AdminUser>
            <AdminRestaurent />
          </AdminUser>
        ),
      },
      {
        path: "/admin/addmenus",
        element: (
          <AdminUser>
            <AdminAddMenus />
          </AdminUser>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminUser>
            <AdminOrder />
          </AdminUser>
        ),
      },
    ],
  },

  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        {" "}
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/verifi-email",
    element: (
      <AuthenticatedUser>
        {" "}
        <VerifiEmail />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
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
