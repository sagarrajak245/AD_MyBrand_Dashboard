import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download, FileText, Filter } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "Monthly Performance Report",
      description: "Comprehensive analysis of campaign performance",
      date: "Dec 2024",
      status: "Ready",
      type: "PDF"
    },
    {
      title: "Q4 Analytics Summary",
      description: "Quarterly review of all marketing channels",
      date: "Q4 2024",
      status: "Processing",
      type: "Excel"
    },
    {
      title: "Campaign ROI Analysis",
      description: "Return on investment breakdown by campaign",
      date: "Nov 2024",
      status: "Ready",
      type: "PDF"
    },
    {
      title: "User Behavior Report",
      description: "Detailed insights into user engagement patterns",
      date: "Dec 2024",
      status: "Ready",
      type: "PDF"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-stone-700 dark:text-gradient mb-2">Reports</h1>
            <p className="text-stone-500  font-semibold  dark:text-amber-100/80">
              Generate and download comprehensive analytics reports
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="glass-light">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="glass-accent hover:glass-glow">
              <FileText className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card
              key={index}
              className="glass-card animate-scale-in hover:animate-float group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-charcoal mb-2">
                      {report.title}
                    </CardTitle>
                    <p className="text-sm text-light-gray">{report.description}</p>
                  </div>
                  <Badge
                    className={`${report.status === 'Ready'
                      ? 'bg-warm-cream/20 text-warm-cream border-warm-cream/30'
                      : 'bg-light-gray/20 text-light-gray border-light-gray/30'
                      } backdrop-blur-sm`}
                  >
                    {report.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-light-gray">
                    <p>Generated: {report.date}</p>
                    <p>Format: {report.type}</p>
                  </div>
                  <div className="p-2 rounded-lg glass-accent group-hover:animate-glass-glow">
                    <FileText className="h-5 w-5 text-charcoal" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 glass-light hover:glass-accent"
                    size="sm"
                    disabled={report.status !== 'Ready'}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="glass-light hover:glass-accent border-light-gray/30"
                    size="sm"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Templates */}
        <Card className="glass-card animate-scale-in col-span-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-charcoal">
              Report Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 glass-light rounded-lg hover:glass-accent transition-all duration-300 cursor-pointer">
                <h4 className="font-medium text-charcoal mb-2">Executive Summary</h4>
                <p className="text-sm text-light-gray">High-level overview for stakeholders</p>
              </div>
              <div className="p-4 glass-light rounded-lg hover:glass-accent transition-all duration-300 cursor-pointer">
                <h4 className="font-medium text-charcoal mb-2">Technical Analysis</h4>
                <p className="text-sm text-light-gray">Detailed metrics and performance data</p>
              </div>
              <div className="p-4 glass-light rounded-lg hover:glass-accent transition-all duration-300 cursor-pointer">
                <h4 className="font-medium text-charcoal mb-2">Custom Report</h4>
                <p className="text-sm text-light-gray">Build your own report template</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;