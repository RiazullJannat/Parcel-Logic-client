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
import MyBookings from "@/components/Dashboard/User/MyBookings";
import MyProfile from "@/components/Dashboard/User/MyProfile";
import AdminRoute from "@/private/AdminRoute";
import Statistics from "@/components/Dashboard/Admin/Statistics";
import AllParcels from "@/components/Dashboard/Admin/AllParcels";
import UpdateBooking from "@/components/Dashboard/User/UpdateBooking";
import AllUsers from "@/components/Dashboard/Admin/AllUsers";
import AllDeliverymen from "@/components/Dashboard/Admin/AllDeliverymen";
import MyDeliveryList from "@/components/Dashboard/DeliveryMan/MyDeliveryList";
import DeliveryRoute from "@/private/DeliveryRoute";
import MyReviews from "@/components/Dashboard/DeliveryMan/MyReviews";

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
          element:<PrivateRouts><BookParcel></BookParcel></PrivateRouts>
        },
        {
          path:'my-parcels',
          element:<MyBookings></MyBookings>
        },
        {
          path:'my-parcels/update/:id',
          element:<UpdateBooking></UpdateBooking>
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
        },
        {
          path:'all-users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'all-deliverymen',
          element:<AdminRoute><AllDeliverymen></AllDeliverymen></AdminRoute>
        },
        {
          path:'my-delivery-list',
          element:<DeliveryRoute><MyDeliveryList></MyDeliveryList></DeliveryRoute>
        },
        {
          path:'my-reviews',
          element:<DeliveryRoute><MyReviews></MyReviews></DeliveryRoute>
        }
      ]
    }
  ]);

export default router;