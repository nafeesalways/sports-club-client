import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Courts from "../pages/Courts/Courts";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
 
    children:[
        {
            index:true,
            Component:Home,
        },{
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
    errorElement:ErrorPage,
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
  }
]);
