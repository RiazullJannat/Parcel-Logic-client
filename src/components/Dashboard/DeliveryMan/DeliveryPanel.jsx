import { ClipboardList, Star } from "lucide-react";
export const DeliveryPanel = ()=>{
  const deliveryPanel = [
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