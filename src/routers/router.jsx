import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/pages/Home";
import Signin from "../components/pages/AuthPage/Signin";

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
        }
      ]
    },
  ]);

export default router;