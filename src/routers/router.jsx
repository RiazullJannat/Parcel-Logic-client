import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home";
import Signin from "../components/pages/AuthPage/Signin";
import SignUp from "@/components/pages/AuthPage/SignUp";
import Dashboard from "@/Layout/Dashboard";
import PrivateRouts from "@/private/PrivateRoute";
import BookParcel from "@/components/Dashboard/User/BookParcel";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/signin',
          element:<Signin></Signin>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRouts><Dashboard></Dashboard></PrivateRouts>,
      children:[
        {
          path:'book-parcel',
          element:<BookParcel></BookParcel>
        },
      ]
    }
  ]);

export default router;