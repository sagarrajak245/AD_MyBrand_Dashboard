import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const Sidebar = lazy(() => import("./Sidebar").then(module => ({ default: module.Sidebar })));
const TopNavigation = lazy(() => import("./TopNavigation").then(module => ({ default: module.TopNavigation })));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Loading skeleton for sidebar
const SidebarSkeleton = () => (
  <div className="hidden md:flex h-full w-[256px] flex-col glass-light border-r border-light-gray/30">
    <div className="p-4 space-y-2">
      <Skeleton className="h-8 w-32 bg-light-gray/30" />
      <Skeleton className="h-6 w-24 bg-light-gray/20" />
    </div>
    <div className="flex-1 p-4 space-y-2">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full bg-light-gray/20" />
      ))}
    </div>
  </div>
);

// Loading skeleton for top navigation
const TopNavSkeleton = () => (
  <div className="h-16 border-b border-light-gray/30 glass-nav">
    <div className="flex items-center justify-between h-full px-6">
      <Skeleton className="h-8 w-8 md:hidden bg-light-gray/20" />
      <Skeleton className="h-8 w-32 bg-light-gray/20" />
      <Skeleton className="h-8 w-8 rounded-full bg-light-gray/20" />
    </div>
  </div>
);

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();

  return (
    <SidebarProvider defaultOpen={true}> {/* Changed to true for desktop visibility */}
      <div className={cn(
        "min-h-screen flex w-full transition-all duration-300",
        // Light mode gradient
        "bg-gradient-to-br from-amber-200/50 via-amber-100 to-stone-100",
        // Dark mode gradient
        "dark:bg-gradient-to-br dark:from-amber-100/25 dark:via-amber-200/90 dark:to-stone-100"
      )}>
        {/* Desktop Sidebar - Always visible on desktop */}
        <div className="hidden md:block"> {/* Wrapper to ensure visibility */}
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </div>

        {/* Mobile Sidebar - Only shows when triggered */}
        <div className="md:hidden">
          <Suspense fallback={null}>
            <Sidebar />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Top Navigation */}
          <Suspense fallback={<TopNavSkeleton />}>
            <TopNavigation />
          </Suspense>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 md:p-6 space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}