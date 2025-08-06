import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        return "text-warm-cream bg-warm-cream/20";
      case "down":
        return "text-red-500 bg-red-500/20";
      default:
        return "text-light-gray bg-light-gray/20";
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

  return (
    <Card className={`glass-card animate-scale-in hover:animate-float group ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-light-gray">{title}</CardTitle>
        <div className="p-2 rounded-lg glass-accent group-hover:animate-glass-glow">
          <Icon className="h-4 w-4 text-charcoal" />
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
            {getTrendIcon()}
            <span className="text-xs font-medium">
              {change > 0 ? "+" : ""}{change}%
            </span>
          </Badge>
          {description && (
            <p className="text-xs text-light-gray">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}