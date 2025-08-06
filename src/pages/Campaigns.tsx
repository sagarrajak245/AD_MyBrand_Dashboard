import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, DollarSign, Download, Filter, MousePointer, Plus, Search, Target } from "lucide-react";

export default function Campaigns() {
  const campaignMetrics = [
    {
      title: "Active Campaigns",
      value: "42",
      change: 8.3,
      trend: "up" as const,
      icon: Target
    },
    {
      title: "Total Budget",
      value: "$125,400",
      change: 15.2,
      trend: "up" as const,
      icon: DollarSign
    },
    {
      title: "Avg. CTR",
      value: "3.24%",
      change: -2.1,
      trend: "down" as const,
      icon: MousePointer
    },
    {
      title: "Campaign ROI",
      value: "247%",
      change: 18.7,
      trend: "up" as const,
      icon: BarChart3
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-700 dark:text-gradient mb-2">Campaign Management</h1>
            <p className="text-stone-500  font-semibold  dark:text-amber-100/80 mt-1">Monitor and optimize your advertising campaigns</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass-light">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="glass-accent">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {campaignMetrics.map((metric, index) => (
            <div
              key={metric.title}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricsCard {...metric} />
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="glass-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray w-4 h-4" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-10 glass-light border-0"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48 glass-light border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 glass-light border-0">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="display">Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="glass-light">
                42 Active
              </Badge>
              <Badge variant="outline" className="glass-light">
                8 Paused
              </Badge>
            </div>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="glass-card">
          <CampaignTable />
        </div>
      </div>
    </DashboardLayout>
  );
}