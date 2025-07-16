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
      {
        path:'makeAdmin',
        Component:MakeAdmin,
      }
    ]
  }
]);
