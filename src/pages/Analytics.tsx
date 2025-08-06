import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gradient mb-2">Detailed Analytics</h1>
          <p className="text-light-gray">
            Deep dive into your performance metrics and user behavior
          </p>
        </div>

        {/* Enhanced Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Page Views"
            value="1,234,567"
            change={18.3}
            trend="up"
            icon={Eye}
            description="this month"
          />
          <MetricsCard
            title="Sessions"
            value="456,789"
            change={12.7}
            trend="up"
            icon={Users}
            description="this month"
          />
          <MetricsCard
            title="Bounce Rate"
            value="32.5%"
            change={-5.2}
            trend="down"
            icon={TrendingUp}
            description="vs last month"
          />
          <MetricsCard
            title="Avg. Session"
            value="4m 32s"
            change={8.9}
            trend="up"
            icon={BarChart3}
            description="duration"
          />
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
                  <div className="text-warm-cream text-sm">+12.3%</div>
                </div>
                <div className="flex items-center justify-between p-4 glass-light rounded-lg">
                  <div>
                    <p className="text-sm text-light-gray">Pages per Session</p>
                    <p className="text-2xl font-bold text-charcoal">3.4</p>
                  </div>
                  <div className="text-warm-cream text-sm">+8.7%</div>
                </div>
                <div className="flex items-center justify-between p-4 glass-light rounded-lg">
                  <div>
                    <p className="text-sm text-light-gray">Return Visitors</p>
                    <p className="text-2xl font-bold text-charcoal">68.2%</p>
                  </div>
                  <div className="text-warm-cream text-sm">+15.4%</div>
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