import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Courts from "../pages/Courts/Courts";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import PendingBookings from "../pages/Dashboard/PendingBookings/PendingBookings";
import Announcements from "../pages/Dashboard/Announcements/Announcements";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AdminRoute from "../routes/AdminRoute";
import ManageBookingApproval from "../pages/Dashboard/ManageBookingApproval/ManageBookingApproval";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageCourts from "../pages/Dashboard/ManageCourts/ManageCourts";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import MemberRoute from "../routes/MemberRoute";
import MemberProfile from "../pages/Dashboard/MemberProfile/MemberProfile";
import MemberPendingBookings from "../pages/Dashboard/MemberPendingBookings/MemberPendingBookings";
import ApprovedBookings from "../pages/Dashboard/ApprovedBookings/ApprovedBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
 
    children:[
        {
            index:true,
            Component:Home,
        },
        {
          path:'/courts',
          Component:Courts,
        },
        {
          path:'/*',
          Component:ErrorPage,
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'/signin',
        Component:SignIn,
      },
      {
        path:'/signup',
        Component:SignUp,
      },
        {
          path:'/*',
          Component:ErrorPage,
        }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'myProfile',
        Component:MyProfile,
      },
      {
        path:'pendingBookings',
        Component:PendingBookings,
      },
      {
        path:'announcements',
        Component:Announcements,
      },
      //admin routes
      {
        path:'makeAdmin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>,
      },
      {
        path:'adminProfile',
        element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>, 
      },
      {
        path:'manageBookingApproval',
        element:<AdminRoute><ManageBookingApproval></ManageBookingApproval></AdminRoute>,
      },
      {
        path:'manageMembers',
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>,
      },
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'manageCourts',
        element:<AdminRoute><ManageCourts></ManageCourts></AdminRoute>,
      },
      {
        path:'manageBookings',
        element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>,
      },
      {
        path:'manageCoupons',
        element:<AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>,
      },
      {
        path:'makeAnnouncement',
        element:<AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>,
      },
      //member routes
      {
        path:'memberProfile',
        element:<MemberRoute><MemberProfile></MemberProfile></MemberRoute>,
      },
      {
        path:'memberPendingBookings',
        element:<MemberRoute><MemberPendingBookings></MemberPendingBookings></MemberRoute>,
      },
      {
        path:'approvedBookings',
        element:<MemberRoute><ApprovedBookings></ApprovedBookings></MemberRoute>,
      }
    ]
  }
]);
