import { ChannelPerformanceChart } from "@/components/charts/ChannelPerformanceChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrafficSourcesChart } from "@/components/charts/TrafficSourcesChart";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Calendar, Download, Star, Target, TrendingDown, TrendingUp, Zap } from "lucide-react";

export default function Performance() {
  const performanceMetrics = [
    {
      title: "Performance Score",
      value: "8.7/10",
      change: 12.5,
      trend: "up" as const,
      icon: BarChart3
    },
    {
      title: "Quality Score",
      value: "9.2/10",
      change: 5.8,
      trend: "up" as const,
      icon: Star
    },
    {
      title: "Efficiency Rate",
      value: "94.3%",
      change: -1.2,
      trend: "down" as const,
      icon: Zap
    },
    {
      title: "Optimization Index",
      value: "87%",
      change: 23.4,
      trend: "up" as const,
      icon: Target
    }
  ];

  const kpiData = [
    { label: "Reach", value: 87, target: 90, color: "bg-warm-cream" },
    { label: "Engagement", value: 76, target: 80, color: "bg-light-gray" },
    { label: "Conversion", value: 94, target: 85, color: "bg-charcoal" },
    { label: "Retention", value: 82, target: 85, color: "bg-warm-cream" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-700 dark:text-gradient">Performance Analytics</h1>
            <p className="text-stone-500  font-semibold  dark:text-amber-100/80 mt-1">Deep dive into campaign performance metrics</p>
          </div>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-48 glass-light border-0">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="glass-light">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <div
              key={metric.title}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricsCard {...metric} />
            </div>
          ))}
        </div>

        {/* KPI Progress Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Key Performance Indicators</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <div key={kpi.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-charcoal">{kpi.label}</span>
                  <span className="text-sm text-light-gray">{kpi.value}%</span>
                </div>
                <Progress value={kpi.value} className="h-2" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-light-gray">Target: {kpi.target}%</span>
                  {kpi.value >= kpi.target ? (
                    <span className="flex items-center text-warm-cream">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      On track
                    </span>
                  ) : (
                    <span className="flex items-center text-light-gray">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Below target
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card">
            <RevenueChart />
          </div>
          <div className="glass-card">
            <ChannelPerformanceChart />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card lg:col-span-2">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-charcoal">Performance Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-light-gray">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Advanced performance analytics coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="glass-card">
            <TrafficSourcesChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}