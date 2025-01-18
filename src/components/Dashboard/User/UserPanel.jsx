import { Package, List, User } from "lucide-react";
export const UserPanel = () => {
  const userPanel = [
    {
      title: "My Parcels",
      url: "/dashboard/my-parcels",
      icon: List, 
    },
    {
      title: "Book a Parcel",
      url: "/dashboard/book-parcel",
      icon: Package, 
    },
    {
      title: "My Profile",
      url: "/dashboard/my-profile",
      icon: User, 
    },
  ];
  return userPanel
}