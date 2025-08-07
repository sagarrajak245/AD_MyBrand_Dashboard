import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Bell, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Link } from "react-router-dom";

export function TopNavigation() {
  const { theme, setTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="glass-nav h-16 px-4 md:px-6 flex items-center justify-between dark:border-b-stone-500 border-b-stone-300  z-navigation sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile/Desktop Sidebar Trigger */}
        <SidebarTrigger className={cn(
          "p-2 rounded-lg glass-light hover:glass-accent",
          "border border-light-gray/20 hover:border-warm-cream/40",
          "transition-all duration-200"
        )}>
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>

        {/* Brand Title - Hidden on small screens when search is focused */}
        <div className={cn(
          "text-lg md:text-xl font-bold bg-gradient-to-r from-stone-800 to-amber-300 bg-clip-text text-transparent dark:text-gradient",
          isSearchFocused && "hidden sm:block"
        )}>
          AdMyBrand Insights
        </div>
      </div>

      {/* Search Bar */}
      <div className={cn(
        "flex-1 max-w-md mx-2 md:mx-8 transition-all duration-200",
        isSearchFocused && "max-w-full mx-2"
      )}>
        <div className="relative">
          <Search className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
            isSearchFocused ? "text-warm-cream" : "text-light-gray"
          )} />
          <Input
            placeholder="Search campaigns, reports..."
            className={cn(
              "pl-10 glass-light border-light-gray/30 transition-all duration-200",
              "text-charcoal placeholder:text-light-gray",
              "focus:border-warm-cream/80 focus:glass-accent",
              "focus:text-charcoal focus:placeholder:text-light-gray/70",
              // Mobile specific improvements
              "text-base md:text-sm", // Larger text on mobile
              "h-10 md:h-9", // Taller on mobile for better touch
              // Better contrast for mobile
              "focus:bg-pure-white/90 focus:backdrop-blur-lg"
            )}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className={cn(
        "flex items-center gap-2 md:gap-3 transition-all duration-200",
        isSearchFocused && "hidden sm:flex"
      )}>
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "w-9 h-9 md:w-10 md:h-10 rounded-lg transition-all duration-200",
            "border border-light-gray/30 hover:border-warm-cream/50",
            "bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm",
            "hover:bg-amber-200 dark:hover:bg-warm-cream",
            "shadow-sm hover:shadow-md"
          )}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-charcoal" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Link to="/settings?tab=notifications">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-lg transition-all duration-200 relative",
              "border border-light-gray/30 hover:border-warm-cream/50",
              "bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm",
              "hover:bg-amber-200 dark:hover:bg-warm-cream",
              "shadow-sm hover:shadow-md"
            )}
          >
            <Bell className="h-4 w-4 text-charcoal dark:text-amber-500" />
            <Badge className={cn(
              "absolute -top-1 -right-1 h-5 w-5 rounded-full p-0",
              "flex items-center justify-center text-xs font-semibold",
              "bg-orange-500 text-white border-1 border-white dark:border-charcoal",
              "animate-pulse shadow-sm"
            )}>
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>

        {/* Settings - Hidden on small screens */}
        <Link to="/settings">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:flex w-9 h-9 md:w-10 md:h-10 rounded-lg transition-all duration-200",
              "border border-light-gray/30 hover:border-warm-cream/50",
              "bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm",
              "hover:bg-amber-200 dark:hover:bg-warm-cream",
              "shadow-sm hover:shadow-md"
            )}
          >
            <Settings className="h-4 w-4 text-charcoal dark:text-amber-500" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>

        {/* User Profile */}
        <Link to="/settings?tab=profile" >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-lg transition-all duration-200",
              "border border-light-gray/30 hover:border-warm-cream/50",
              "bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm",
              "hover:bg-amber-200 dark:hover:bg-warm-cream",
              "shadow-sm hover:shadow-md"
            )}
          >
            <User className="h-4 w-4 text-charcoal dark:text-amber-500" />
            <span className="sr-only">User menu</span>
          </Button>
        </Link>
      </div>

      {/* Mobile Search Close Button */}
      {isSearchFocused && (
        <Button
          variant="default"
          size="icon"
          className={cn(
            "sm:hidden w-9 h-9 rounded-lg transition-all duration-200 ml-2",
            "border border-light-gray/30 hover:border-warm-cream/50",
            "bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm",
            "hover:bg-amber-200 dark:hover:bg-warm-cream",
            "shadow-sm hover:shadow-md"
          )}
          onClick={() => setIsSearchFocused(false)}
        >
          <Search className="h-4 w-4 text-charcoal dark:text-warm-cream" />
        </Button>
      )}
    </header>
  );
} 