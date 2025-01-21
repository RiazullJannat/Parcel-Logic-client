import { ClipboardList, Star, Home } from "lucide-react";
export const DeliveryPanel = ()=>{
  const deliveryPanel = [
    {
      title: "Home",
      url: "/",
      icon: Home, 
    },
    {
      title: "My Delivery List",
      url: "my-delivery-list",
      icon: ClipboardList, // Represents a list or task overview
    },
    {
      title: "My Reviews",
      url: "my-reviews",
      icon: Star, // Represents ratings or reviews
    },
  ];
    return deliveryPanel
}