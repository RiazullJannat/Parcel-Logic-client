import { Package, List, User } from "lucide-react";
export const UserPanel = () => {
  const userPanel = [
    {
      title: "My Parcels",
      url: "my-parcels",
      icon: List, // Represents a list of items
    },
    {
      title: "Book a Parcel",
      url: "/dashboard/book-parcel",
      icon: Package, // Represents parcels or deliveries
    },
    {
      title: "My Profile",
      url: "my-profile",
      icon: User, // Represents a user or profile
    },
  ];
  return userPanel
}