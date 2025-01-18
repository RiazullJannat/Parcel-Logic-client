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
import MyParcel from "@/components/Dashboard/User/MyParcel";
import MyProfile from "@/components/Dashboard/User/MyProfile";
import AdminRoute from "@/private/AdminRoute";
import Statistics from "@/components/Dashboard/Admin/Statistics";
import AllParcels from "@/components/Dashboard/Admin/AllParcels";

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
        {
          path:'my-parcels',
          element:<MyParcel></MyParcel>
        },
        {
          path:'my-profile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'statistics',
          element:<AdminRoute><Statistics></Statistics></AdminRoute>
        },
        {
          path:'all-parcels',
          element:<AdminRoute><AllParcels></AllParcels></AdminRoute>
        }
      ]
    }
  ]);

export default router;