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
import { useState } from "react";

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock data for different time periods
  const performanceData = {
    "7d": {
      metrics: [
        {
          title: "Performance Score",
          value: "8.4/10",
          change: 8.2,
          trend: "up" as const,
          icon: BarChart3
        },
        {
          title: "Quality Score",
          value: "9.1/10",
          change: 3.5,
          trend: "up" as const,
          icon: Star
        },
        {
          title: "Efficiency Rate",
          value: "92.8%",
          change: -2.1,
          trend: "down" as const,
          icon: Zap
        },
        {
          title: "Optimization Index",
          value: "85%",
          change: 18.7,
          trend: "up" as const,
          icon: Target
        }
      ],
      kpiData: [
        { label: "Reach", value: 82, target: 90, color: "bg-warm-cream" },
        { label: "Engagement", value: 74, target: 80, color: "bg-light-gray" },
        { label: "Conversion", value: 89, target: 85, color: "bg-charcoal" },
        { label: "Retention", value: 79, target: 85, color: "bg-warm-cream" }
      ]
    },
    "30d": {
      metrics: [
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
      ],
      kpiData: [
        { label: "Reach", value: 87, target: 90, color: "bg-warm-cream" },
        { label: "Engagement", value: 76, target: 80, color: "bg-light-gray" },
        { label: "Conversion", value: 94, target: 85, color: "bg-charcoal" },
        { label: "Retention", value: 82, target: 85, color: "bg-warm-cream" }
      ]
    },
    "90d": {
      metrics: [
        {
          title: "Performance Score",
          value: "8.9/10",
          change: 15.3,
          trend: "up" as const,
          icon: BarChart3
        },
        {
          title: "Quality Score",
          value: "9.4/10",
          change: 8.2,
          trend: "up" as const,
          icon: Star
        },
        {
          title: "Efficiency Rate",
          value: "96.1%",
          change: 2.8,
          trend: "up" as const,
          icon: Zap
        },
        {
          title: "Optimization Index",
          value: "91%",
          change: 28.6,
          trend: "up" as const,
          icon: Target
        }
      ],
      kpiData: [
        { label: "Reach", value: 92, target: 90, color: "bg-warm-cream" },
        { label: "Engagement", value: 81, target: 80, color: "bg-light-gray" },
        { label: "Conversion", value: 97, target: 85, color: "bg-charcoal" },
        { label: "Retention", value: 88, target: 85, color: "bg-warm-cream" }
      ]
    },
    "1y": {
      metrics: [
        {
          title: "Performance Score",
          value: "9.1/10",
          change: 22.8,
          trend: "up" as const,
          icon: BarChart3
        },
        {
          title: "Quality Score",
          value: "9.6/10",
          change: 12.4,
          trend: "up" as const,
          icon: Star
        },
        {
          title: "Efficiency Rate",
          value: "97.8%",
          change: 8.5,
          trend: "up" as const,
          icon: Zap
        },
        {
          title: "Optimization Index",
          value: "94%",
          change: 35.2,
          trend: "up" as const,
          icon: Target
        }
      ],
      kpiData: [
        { label: "Reach", value: 95, target: 90, color: "bg-warm-cream" },
        { label: "Engagement", value: 88, target: 80, color: "bg-light-gray" },
        { label: "Conversion", value: 98, target: 85, color: "bg-charcoal" },
        { label: "Retention", value: 93, target: 85, color: "bg-warm-cream" }
      ]
    }
  };

  const currentData = performanceData[selectedPeriod as keyof typeof performanceData];

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "7d": return "Last 7 days";
      case "30d": return "Last 30 days";
      case "90d": return "Last 90 days";
      case "1y": return "Last year";
      default: return "Last 30 days";
    }
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-700 dark:text-gradient">Performance Analytics</h1>
            <p className="text-stone-500 font-semibold dark:text-amber-100/80 mt-1">Deep dive into campaign performance metrics</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-48 glass-light border-0">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder={getPeriodLabel(selectedPeriod)} />
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
          {currentData.metrics.map((metric, index) => (
            <div
              key={`${metric.title}-${selectedPeriod}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricsCard {...metric} />
            </div>
          ))}
        </div>

        {/* KPI Progress Section */}
        <div className="glass-card border-stone-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-charcoal">Key Performance Indicators</h2>
            <span className="text-sm text-silver-200 dark:stone-500 font-medium">
              Period: {getPeriodLabel(selectedPeriod)}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {currentData.kpiData.map((kpi, index) => (
              <div key={`${kpi.label}-${selectedPeriod}`} className="space-y-3 text-slate-900">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-charcoal">{kpi.label}</span>
                  <span className="text-sm text-silver">{kpi.value}%</span>
                </div>
                <Progress value={kpi.value} className="h-2" />
                <div className="flex justify-between items-center text-xs">
                  <span className=" text-silver-200 dark:text-stone-600">Target: {kpi.target}%</span>
                  {kpi.value >= kpi.target ? (
                    <span className="flex items-center text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      On track
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
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

        <div className="grid gap-6 border-transparent shadow-none lg:grid-cols-3">
          <div className="glass-card  lg:col-span-2">
            <Card className="border-stone-100 bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="text-silver  dark: text-stone-700">
                  Performance Trend Analysis - {getPeriodLabel(selectedPeriod)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-light-gray">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 text-slate-400 " />
                    <p className="text-slate-700">Advanced performance analytics coming soon</p>
                    <p className="text-xs mt-1 text-slate-500">
                      Currently showing data for {getPeriodLabel(selectedPeriod).toLowerCase()}
                    </p>
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