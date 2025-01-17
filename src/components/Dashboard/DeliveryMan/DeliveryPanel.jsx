import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
export const DeliveryPanel = ()=>{
    const deliveryPanel = [
        {
          title: "Home",
          url: "#",
          icon: Home,
        },
        {
          title: "Inbox",
          url: "#",
          icon: Inbox,
        },
        {
          title: "Calendar",
          url: "#",
          icon: Calendar,
        },
        {
          title: "Search",
          url: "#",
          icon: Search,
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
        },
      ]
    return deliveryPanel
}