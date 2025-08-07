import { RevenueChart } from "@/components/charts/RevenueChart";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, BarChart3, DollarSign, Eye, Target, TrendingUp, UserCheck, Users } from "lucide-react";
import { useState } from "react";

const metricsData = {
  week: [
    { title: "Page Views", value: "123,456", change: 2.3, trend: "up", icon: Eye, description: "this week" },
    { title: "Sessions", value: "45,678", change: 1.7, trend: "up", icon: Users, description: "this week" },
    { title: "Bounce Rate", value: "28.5%", change: -1.2, trend: "down", icon: TrendingUp, description: "vs last week" },
    { title: "Avg. Session", value: "3m 12s", change: 0.9, trend: "up", icon: BarChart3, description: "duration" },
    { title: "Revenue", value: "$12,345", change: 3.1, trend: "up", icon: DollarSign, description: "this week" },
    { title: "Active Users", value: "2,345", change: 2.8, trend: "up", icon: UserCheck, description: "this week" },
    { title: "Conversion Rate", value: "4.2%", change: 0.3, trend: "up", icon: Target, description: "this week" },
    { title: "Engagement", value: "78%", change: 1.5, trend: "up", icon: Activity, description: "this week" },
  ],
  month: [
    { title: "Page Views", value: "1,234,567", change: 18.3, trend: "up", icon: Eye, description: "this month" },
    { title: "Sessions", value: "456,789", change: 12.7, trend: "up", icon: Users, description: "this month" },
    { title: "Bounce Rate", value: "32.5%", change: -5.2, trend: "down", icon: TrendingUp, description: "vs last month" },
    { title: "Avg. Session", value: "4m 32s", change: 8.9, trend: "up", icon: BarChart3, description: "duration" },
    { title: "Revenue", value: "$234,567", change: 15.1, trend: "up", icon: DollarSign, description: "this month" },
    { title: "Active Users", value: "45,678", change: 8.2, trend: "up", icon: UserCheck, description: "this month" },
    { title: "Conversion Rate", value: "5.1%", change: 0.7, trend: "up", icon: Target, description: "this month" },
    { title: "Engagement", value: "82%", change: 2.3, trend: "up", icon: Activity, description: "this month" },
  ],
  quarter: [
    { title: "Page Views", value: "3,456,789", change: 28.3, trend: "up", icon: Eye, description: "last 3 months" },
    { title: "Sessions", value: "1,234,567", change: 22.7, trend: "up", icon: Users, description: "last 3 months" },
    { title: "Bounce Rate", value: "30.1%", change: -3.8, trend: "down", icon: TrendingUp, description: "vs prev. quarter" },
    { title: "Avg. Session", value: "4m 12s", change: 6.2, trend: "up", icon: BarChart3, description: "duration" },
    { title: "Revenue", value: "$678,901", change: 21.4, trend: "up", icon: DollarSign, description: "last 3 months" },
    { title: "Active Users", value: "123,456", change: 12.5, trend: "up", icon: UserCheck, description: "last 3 months" },
    { title: "Conversion Rate", value: "5.8%", change: 1.1, trend: "up", icon: Target, description: "last 3 months" },
    { title: "Engagement", value: "85%", change: 3.2, trend: "up", icon: Activity, description: "last 3 months" },
  ],
  year: [
    { title: "Page Views", value: "12,345,678", change: 38.3, trend: "up", icon: Eye, description: "this year" },
    { title: "Sessions", value: "4,567,890", change: 32.7, trend: "up", icon: Users, description: "this year" },
    { title: "Bounce Rate", value: "29.5%", change: -4.2, trend: "down", icon: TrendingUp, description: "vs last year" },
    { title: "Avg. Session", value: "5m 02s", change: 10.9, trend: "up", icon: BarChart3, description: "duration" },
    { title: "Revenue", value: "$2,345,678", change: 25.1, trend: "up", icon: DollarSign, description: "this year" },
    { title: "Active Users", value: "456,789", change: 18.2, trend: "up", icon: UserCheck, description: "this year" },
    { title: "Conversion Rate", value: "6.2%", change: 1.7, trend: "up", icon: Target, description: "this year" },
    { title: "Engagement", value: "88%", change: 4.5, trend: "up", icon: Activity, description: "this year" },
  ],
};

const filterOptions = [
  { value: "week", label: "Past Week" },
  { value: "month", label: "Past 30 Days" },
  { value: "quarter", label: "Past 3 Months" },
  { value: "year", label: "Past Year" },
];

const Analytics = () => {
  const [selectedRange, setSelectedRange] = useState("month");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-900 to-amber-500 bg-clip-text text-transparent dark:text-gradient">Detailed Analytics</h1>
          <p className="text-stone-500 font-semibold dark:text-amber-100/80">
            Deep dive into your performance metrics and user behavior
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-silver  gap-4">
          <div></div>
          <div className="w-full sm:w-56 relative z-50">
            <Select value={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-50">
                {filterOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData[selectedRange].map((metric, idx) => (
            <MetricsCard key={metric.title + idx} {...metric} />
          ))}
        </div>

        {/* Enhanced Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />

          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-charcoal">
                User Engagement Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-light rounded-lg">
                  <div>
                    <p className="text-sm text-light-gray">Average Time on Site</p>
                    <p className="text-2xl font-bold text-charcoal">4m 32s</p>
                  </div>
                  <div className="text-orange-400 text-sm">+12.3%</div>
                </div>
                <div className="flex items-center justify-between p-4 glass-light rounded-lg">
                  <div>
                    <p className="text-sm text-light-gray">Pages per Session</p>
                    <p className="text-2xl font-bold text-charcoal">3.4</p>
                  </div>
                  <div className="text-orange-400 text-sm">+8.7%</div>
                </div>
                <div className="flex items-center justify-between p-4 glass-light rounded-lg">
                  <div>
                    <p className="text-sm text-light-gray">Return Visitors</p>
                    <p className="text-2xl font-bold text-charcoal">68.2%</p>
                  </div>
                  <div className="text-orange-400 text-sm">+15.4%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;