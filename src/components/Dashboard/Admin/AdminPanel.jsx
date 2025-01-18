import { Package, Users, Truck, BarChart2 } from "lucide-react";
export const AdminPanel = () => {
  const adminPanel = [
    {
      title: "Statistics",
      url: "dashboard/statistics",
      icon: BarChart2, // Represents data visualization or statistics
    },
    {
      title: "All Parcels",
      url: "dashboard/all-parcels",
      icon: Package, // Represents parcels or packages
    },
    {
      title: "All Users",
      url: "all-users",
      icon: Users, // Represents a group of users
    },
    {
      title: "All Delivery Men",
      url: "all-delivery-men",
      icon: Truck, // Represents delivery personnel or vehicles
    },

  ];
  return adminPanel
}