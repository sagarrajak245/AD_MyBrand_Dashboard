import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  className = "",
}: MetricsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-warm-cream bg-warm-cream/60 dark:bg-warm-cream/20";
      case "down":
        return "text-red-500 bg-red-500/40 dark:bg-red-500/20";
      default:
        return "text-light-gray bg-light-gray/50 dark:bg-light-gray/20";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTrendTextColor = () => {
    switch (trend) {
      case "up":
        return "text-amber-600";
      case "down":
        return "text-red-600";
      default:
        return "text-charcoal";
    }
  };

  return (
    <Card className={`glass-card animate-scale-in hover:animate-float group ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-silver-100">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-orange-400 glass-accent group-hover:animate-glass-glow">
          <Icon className="h-4 w-4 text-charcoal  dark: text-stone-600 " />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-charcoal mb-2 group-hover:text-gradient transition-all duration-300">
          {value}
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="secondary"
            className={`${getTrendColor()} flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md`}
          >
            {trend !== "neutral" && (
              trend === "up"
                ? <TrendingUp className={`h-3 w-3 ${getTrendTextColor()}`} />
                : <TrendingDown className={`h-3 w-3 ${getTrendTextColor()}`} />
            )}
            <span className={`text-xs font-medium ${getTrendTextColor()}`}>
              {change > 0 ? "+" : ""}{change}%
            </span>
          </Badge>
          {description && (
            <p className="text-xs text-semibold text-light-gray">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}