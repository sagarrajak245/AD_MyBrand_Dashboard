import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  Sidebar as SidebarRoot,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Target,
  TrendingUp
} from "lucide-react";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
}

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Target, label: "Campaigns", href: "/campaigns" },
  { icon: TrendingUp, label: "Performance", href: "/performance" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SidebarItem = memo(({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={isCollapsed ? label : undefined}
        className={cn(
          "group relative transition-all duration-200 ease-in-out rounded-lg",
          "hover:glass-accent hover:text-charcoal",
          "focus-visible:glass-accent focus-visible:text-charcoal",
          "text-charcoal/80 hover:text-charcoal",
          isActive && [
            "glass-accent text-charcoal font-medium",
            "shadow-lg shadow-warm-cream/20",
            "border-l-3 border-warm-cream"
          ]
        )}
      >
        <Link to={href} className="flex items-center gap-3 w-full">
          <Icon className={cn(
            "w-5 h-5 transition-colors duration-200",
            isActive ? "text-warm-cream" : "text-charcoal/70",
            "group-hover:text-warm-cream"
          )} />
          <span className={cn(
            "transition-all duration-200",
            isActive ? "text-charcoal font-medium" : "text-charcoal/80",
            "group-hover:text-charcoal",
            "truncate"
          )}>
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

SidebarItem.displayName = "SidebarItem";

export const Sidebar = memo(() => {
  const location = useLocation();
  const { state, isMobile } = useSidebar();

  return (
    <SidebarRoot
      variant="sidebar" // Changed from floating to sidebar
      side="left"
      className={cn(
        "transition-all duration-300 ease-in-out",
        "glass-light border-r border-light-gray/30",
        "shadow-lg shadow-charcoal/5",
        // Force visibility on desktop
        "md:flex md:w-[256px]",
        // Mobile handling
        isMobile && "z-modal"
      )}
    >
      <div className={cn(
        "h-full flex flex-col",
        "bg-gradient-to-b from-light-silver/50 to-pure-white/80",
        "backdrop-blur-md"
      )}>
        {/* Header */}
        <SidebarHeader className="p-4 border-b border-light-gray/20">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "bg-gradient-to-br from-warm-cream to-warm-cream/80",
              "shadow-md shadow-warm-cream/30"
            )}>
              <img
                src="../assets/web_logo.svg"
                alt="Logo"
                className="w-6 h-6 object-cover rounded-full"
              />

            </div>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-charcoal font-semibold text-lg leading-none">
                  Ad_MyBand
                </span>
                <span className="text-light-gray text-xs">
                  Community Platform
                </span>
              </div>
            )}
          </div>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent className="flex-1 p-4">
          <SidebarMenu className="space-y-2">
            {navigationItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        {state !== "collapsed" && (
          <div className="p-4 border-t border-light-gray/20">
            <div className={cn(
              "p-3 rounded-lg glass-accent",
              "border border-warm-cream/30"
            )}>
              <p className="text-charcoal text-sm font-medium">
                See your all details...
              </p>
              <p className="text-light-gray text-xs mt-1">
                Grow your company with our insights
              </p>
            </div>
          </div>
        )}

        {/* Rail for resize */}
        <SidebarRail />
      </div>
    </SidebarRoot>
  );
});

Sidebar.displayName = "Sidebar";