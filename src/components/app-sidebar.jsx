import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import useRole from "@/Hooks/useRole";
import { UserPanel } from "./Dashboard/User/UserPanel";
import { DeliveryPanel } from "./Dashboard/DeliveryMan/DeliveryPanel";
import { AdminPanel } from "./Dashboard/Admin/AdminPanel";

// Menu items.
const userPanel = UserPanel();
const deliveryPanel = DeliveryPanel();
const adminPanel = AdminPanel();
export function AppSidebar() {
  const {role} = useRole();
  const [panel, setPanel] = useState([]);
  useEffect(()=>{
    if(role==="user"){
      setPanel(userPanel)
    }
    if(role ==="delivery-man"){
      setPanel(deliveryPanel)
    }
    if(role ==="admin"){
      setPanel(adminPanel)
    }
  },[role])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {panel.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}