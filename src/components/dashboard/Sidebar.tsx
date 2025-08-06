import { BarChart3, Home, PieChart, Settings, Target, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: PieChart },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Performance", url: "/performance", icon: TrendingUp },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClassName = (path: string) =>
    isActive(path) 
      ? "glass-accent text-charcoal font-medium animate-glass-glow" 
      : "glass-light hover:glass-accent transition-all duration-300";

  return (
    <SidebarContainer
      className={`${
        isCollapsed ? "w-14" : "w-64"
      } glass-card bg-sidebar/50 border-r border-light-gray/15 z-navigation transition-all duration-300 
      shadow-[0_8px_32px_rgba(33,33,33,0.12),0_2px_16px_rgba(33,33,33,0.08)] 
      hover:shadow-[0_16px_48px_rgba(33,33,33,0.16),0_4px_24px_rgba(33,33,33,0.12)]`}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "hidden" : "block"} text-light-gray mb-4`}>
            Main Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`${getNavClassName(item.url)} rounded-xl p-3 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}