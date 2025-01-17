import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home";
import Signin from "../components/pages/AuthPage/Signin";
import SignUp from "@/components/pages/AuthPage/SignUp";
import Dashboard from "@/Layout/Dashboard";
import PrivateRouts from "@/private/PrivateRoute";

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
      path:'/dashboard',
      element:<PrivateRouts><Dashboard></Dashboard></PrivateRouts>,
      children:[
        {},
      ]
    }
  ]);

export default router;