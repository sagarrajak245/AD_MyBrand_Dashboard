import { ChannelPerformanceChart } from "@/components/charts/ChannelPerformanceChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrafficSourcesChart } from "@/components/charts/TrafficSourcesChart";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Filter, Target, TrendingUp, Users } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Analytics Overview</h1>
            <p className="text-stone-500  font-semibold  dark:text-amber-100/80">
              Track your marketing performance and campaign insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="glass-light">
              <Calendar className="h-3 w-3 mr-1" />
              Last 30 days
            </Badge>
            <Button className="glass-accent hover:glass-glow">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Revenue"
            value="$2,345,678"
            change={12.5}
            trend="up"
            icon={DollarSign}
            description="vs last month"
            className="animate-fade-in-up"
          />
          <MetricsCard
            title="Active Users"
            value="45,678"
            change={8.2}
            trend="up"
            icon={Users}
            description="vs last month"
            className="animate-fade-in-up"
          />
          <MetricsCard
            title="Conversion Rate"
            value="23.4%"
            change={-2.1}
            trend="down"
            icon={Target}
            description="vs last month"
            className="animate-fade-in-up"
          />
          <MetricsCard
            title="Campaign ROI"
            value="156%"
            change={15.3}
            trend="up"
            icon={TrendingUp}
            description="vs last month"
            className="animate-fade-in-up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <ChannelPerformanceChart />
          <TrafficSourcesChart />
        </div>

        {/* Campaign Table */}
        <CampaignTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
