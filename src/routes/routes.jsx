import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminProtectedRoute from "../components/layouts/AdminProtectedRoute";
import ProtectedLogin from "../components/layouts/ProtectedLogin";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Login from "../pages/login/Login";
import ManageDevices from "../pages/manageDevices/ManageDevices";
import ManageUsers from "../pages/manageUsers/ManageUsers";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import ManageTimeSheet from "../pages/timeSheet/ManageTimeSheet";
import TimeSheet from "../pages/timeSheet/TimeSheet";
import AddNewTrip from "../pages/trip/AddNewTrip";
import UpdateTrip from "../pages/trip/UpdateTrip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TimeSheet />,
      },
      {
        path: "/new-trip",
        element: <AddNewTrip />,
      },
      {
        path: "/update-trip/:id",
        element: <UpdateTrip />,
      },
      {
        path: "/manage-time-sheet",
        element: <ManageTimeSheet />,
      },
      {
        path: "/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/manage-users",
        element: (
          <AdminProtectedRoute>
            <ManageUsers />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-devices",
        element: (
          <ProtectedRoute>
            <ManageDevices />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <ProtectedLogin>
        <Login />
      </ProtectedLogin>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ProtectedLogin>
        <ForgotPassword />
      </ProtectedLogin>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ProtectedLogin>
        <ResetPassword />
      </ProtectedLogin>
    ),
  },
]);

export default router;
