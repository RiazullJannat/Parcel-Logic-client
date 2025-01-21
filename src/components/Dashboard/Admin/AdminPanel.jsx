import { Package, Users, Truck, BarChart2 } from "lucide-react";
export const AdminPanel = () => {
  const adminPanel = [
    {
      title: "Statistics",
      url: "/dashboard/statistics",
      icon: BarChart2, 
    },
    {
      title: "Statistics",
      url: "/dashboard/statistics",
      icon: BarChart2, 
    },
    {
      title: "All Parcels",
      url: "/dashboard/all-parcels",
      icon: Package, 
    },
    {
      title: "All Users",
      url: "all-users",
      icon: Users, 
    },
    {
      title: "All Delivery Men",
      url: "all-deliverymen",
      icon: Truck, 
    },

  ];
  return adminPanel
}