import { ChannelPerformanceChart } from "@/components/charts/ChannelPerformanceChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrafficSourcesChart } from "@/components/charts/TrafficSourcesChart";
import { UserActivityScatterChart } from "@/components/charts/UserActivityScatterChart";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Calendar, DollarSign, Filter, Target, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const metricsData = {
  week: [
    { title: "Total Revenue", value: "$123,456", change: 2.3, trend: "up", icon: DollarSign, description: "this week" },
    { title: "Active Users", value: "12,345", change: 1.7, trend: "up", icon: Users, description: "this week" },
    { title: "Conversion Rate", value: "18.5%", change: -1.2, trend: "down", icon: Target, description: "vs last week" },
    { title: "Campaign ROI", value: "145%", change: 3.9, trend: "up", icon: TrendingUp, description: "this week" },
  ],
  month: [
    { title: "Total Revenue", value: "$2,345,678", change: 12.5, trend: "up", icon: DollarSign, description: "vs last month" },
    { title: "Active Users", value: "45,678", change: 8.2, trend: "up", icon: Users, description: "vs last month" },
    { title: "Conversion Rate", value: "23.4%", change: -2.1, trend: "down", icon: Target, description: "vs last month" },
    { title: "Campaign ROI", value: "156%", change: 15.3, trend: "up", icon: TrendingUp, description: "vs last month" },
  ],
  quarter: [
    { title: "Total Revenue", value: "$6,789,012", change: 28.3, trend: "up", icon: DollarSign, description: "last 3 months" },
    { title: "Active Users", value: "123,456", change: 22.7, trend: "up", icon: Users, description: "last 3 months" },
    { title: "Conversion Rate", value: "25.8%", change: 1.1, trend: "up", icon: Target, description: "vs prev. quarter" },
    { title: "Campaign ROI", value: "178%", change: 21.4, trend: "up", icon: TrendingUp, description: "last 3 months" },
  ],
  year: [
    { title: "Total Revenue", value: "$23,456,789", change: 38.3, trend: "up", icon: DollarSign, description: "this year" },
    { title: "Active Users", value: "456,789", change: 32.7, trend: "up", icon: Users, description: "this year" },
    { title: "Conversion Rate", value: "27.2%", change: 4.7, trend: "up", icon: Target, description: "vs last year" },
    { title: "Campaign ROI", value: "189%", change: 25.1, trend: "up", icon: TrendingUp, description: "this year" },
  ],
};

const filterOptions = [
  { value: "week", label: "Past Week" },
  { value: "month", label: "Past 30 Days" },
  { value: "quarter", label: "Past 3 Months" },
  { value: "year", label: "Past Year" },
];

const Index = () => {
  const [selectedRange, setSelectedRange] = useState("month");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Analytics Overview</h1>
            <p className="text-stone-500 font-semibold dark:text-amber-100/80">
              Track your marketing performance and campaign insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="glass-light">
              <Calendar className="h-3 w-3 mr-2 " />
              {filterOptions.find(option => option.value === selectedRange)?.label || "Past 30 Days"}
            </Badge>
            <div className="relative z-50">
              <Select value={selectedRange} onValueChange={setSelectedRange}>
                <SelectTrigger className="glass-accent hover:glass-glow w-12 h-10 px-2 border-none mr-1 flex items-center justify-between gap-1">
                  <Filter className="h-4 w-4" />
                </SelectTrigger>

                <SelectContent position="popper" className="z-50">
                  {filterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData[selectedRange].map((metric, idx) => (
            <MetricsCard
              key={metric.title + idx}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
              description={metric.description}
              className="animate-fade-in-up"
            />
          ))}
        </div>

        {/* Charts Section - Updated to 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <RevenueChart />
          <ChannelPerformanceChart />
          <UserActivityScatterChart />
          <TrafficSourcesChart />
        </div>

        {/* Campaign Table */}
        <CampaignTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;