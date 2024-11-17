import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminProtectedRoute from "../components/layouts/AdminProtectedRoute";
import ProtectedLogin from "../components/layouts/ProtectedLogin";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import CreateIndividual from "../pages/individual/CreateIndividual";
import UpdateIndividual from "../pages/individual/UpdateIndividual";
import Login from "../pages/login/Login";
import ManageDevices from "../pages/manageDevices/ManageDevices";
import ManageRoster from "../pages/manageRoster/ManageRoster";
import ManageUsers from "../pages/manageUsers/ManageUsers";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import CreateRole from "../pages/role/CreateRole";
import UpdateRole from "../pages/role/UpdateRole";
import UpdateRoster from "../pages/roster/UpdateRoster";
import TimeSheet from "../pages/timeSheet/TimeSheet";
import AddNewTrip from "../pages/trip/AddNewTrip";
import UploadRoster from "../pages/uploadRoster/UploadRoster";
import CreateWeekend from "../pages/weekend/CreateWeekend";
import UpdateWeekend from "../pages/weekend/UpdateWeekend";

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
        path: "/time-sheet",
        element: <TimeSheet />,
      },
      {
        path: "/new-trip",
        element: <AddNewTrip />,
      },
      {
        path: "/update-roster/:id",
        element: (
          <AdminProtectedRoute>
            <UpdateRoster />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/create-individual",
        element: (
          <AdminProtectedRoute>
            <CreateIndividual />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/create-weekend",
        element: (
          <AdminProtectedRoute>
            <CreateWeekend />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/create-role",
        element: (
          <AdminProtectedRoute>
            <CreateRole />
          </AdminProtectedRoute>
        ),
      },

      {
        path: "/update-individual/:id",
        element: (
          <AdminProtectedRoute>
            <UpdateIndividual />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/update-weekend/:id",
        element: (
          <AdminProtectedRoute>
            <UpdateWeekend />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/update-role/:id",
        element: (
          <AdminProtectedRoute>
            <UpdateRole />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/upload-roster",
        element: (
          <AdminProtectedRoute>
            <UploadRoster />
          </AdminProtectedRoute>
        ),
      },

      {
        path: "/manage-roster",
        element: (
          <AdminProtectedRoute>
            <ManageRoster />
          </AdminProtectedRoute>
        ),
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
