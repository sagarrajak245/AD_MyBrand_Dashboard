import { Bell, Search, Settings, Sun, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";

export function TopNavigation() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="glass-nav h-16 px-6 flex items-center justify-between border-b border-light-gray/15 z-navigation sticky top-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="text-xl font-bold text-gradient">ADmyBRAND Insights</div>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray h-4 w-4" />
          <Input 
            placeholder="Search campaigns, reports..." 
            className="pl-10 glass-light border-light-gray/30 focus:border-warm-cream/50"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="glass-light hover:glass-accent"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button variant="ghost" size="icon" className="glass-light hover:glass-accent relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-warm-cream text-charcoal text-xs">
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="icon" className="glass-light hover:glass-accent">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="glass-light hover:glass-accent">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}