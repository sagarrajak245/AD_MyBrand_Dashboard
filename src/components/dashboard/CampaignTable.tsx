import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Archive, Copy, Edit, Eye, MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  roi: number;
  channel: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'Active',
    budget: 50000,
    spend: 38450,
    impressions: 2540000,
    clicks: 45800,
    ctr: 1.8,
    conversions: 890,
    roi: 3.2,
    channel: 'Social'
  },
  {
    id: '2',
    name: 'Brand Awareness Q4',
    status: 'Active',
    budget: 75000,
    spend: 62100,
    impressions: 3890000,
    clicks: 67200,
    ctr: 1.7,
    conversions: 1240,
    roi: 4.1,
    channel: 'Search'
  },
  {
    id: '3',
    name: 'Product Launch',
    status: 'Paused',
    budget: 30000,
    spend: 28900,
    impressions: 1560000,
    clicks: 28100,
    ctr: 1.8,
    conversions: 520,
    roi: 2.8,
    channel: 'Display'
  },
  {
    id: '4',
    name: 'Email Newsletter',
    status: 'Active',
    budget: 25000,
    spend: 18200,
    impressions: 890000,
    clicks: 34600,
    ctr: 3.9,
    conversions: 780,
    roi: 5.2,
    channel: 'Email'
  },
  {
    id: '5',
    name: 'Video Campaign',
    status: 'Completed',
    budget: 60000,
    spend: 59800,
    impressions: 2890000,
    clicks: 51200,
    ctr: 1.8,
    conversions: 680,
    roi: 3.7,
    channel: 'Video'
  },
];

export function CampaignTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [visibleRows, setVisibleRows] = useState(5);

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, visibleRows);
  }, [campaigns, searchTerm, visibleRows]);

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-warm-cream/10 text-amber-200 border-amber-200';
      case 'Paused':
        return 'bg-light-gray-100/30 text-silver-200 border-light-gray-100';
      case 'Completed':
        return 'bg-green-200/10 text-green-300 border-green-100';
      default:
        return 'bg-light-gray-100/20 text-light-gray-200 border-light-gray/30';
    }
  };

  const loadMore = () => {
    setVisibleRows(prev => prev + 5);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore();
    }
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "Campaign Performance Report";
    const date = new Date().toLocaleDateString();

    // Add title and date
    doc.setFontSize(16);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, 28);

    // Prepare data for the table
    const tableData = filteredCampaigns.map(campaign => [
      campaign.name,
      campaign.status,
      campaign.channel,
      `$${campaign.budget.toLocaleString()}`,
      `$${campaign.spend.toLocaleString()}`,
      `${campaign.ctr}%`,
      campaign.conversions,
      `${campaign.roi}x`
    ]);

    // Add the table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).autoTable({
      head: [['Campaign', 'Status', 'Channel', 'Budget', 'Spend', 'CTR', 'Conversions', 'ROI']],
      body: tableData,
      startY: 35,
      styles: {
        cellPadding: 3,
        fontSize: 9,
        valign: 'middle',
        halign: 'center',
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save(`campaign-report-${date}.pdf`);
  };

  const exportToCSV = () => {
    const headers = ['Campaign', 'Status', 'Channel', 'Budget', 'Spend', 'CTR', 'Conversions', 'ROI'];
    const csvData = [
      headers.join(','),
      ...filteredCampaigns.map(campaign => [
        `"${campaign.name}"`,
        campaign.status,
        campaign.channel,
        campaign.budget,
        campaign.spend,
        campaign.ctr,
        campaign.conversions,
        campaign.roi
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `campaigns-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(filteredCampaigns, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, `campaigns-${new Date().toISOString().slice(0, 10)}.json`);
  };

  // Export Button Component
  const ExportButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="glass-accent hover:glass-glow w-full md:w-auto">
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-light backdrop-blur-md border border-light-gray/30">
        <DropdownMenuItem
          className="hover:glass-accent cursor-pointer"
          onClick={exportToPDF}
        >
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:glass-accent cursor-pointer"
          onClick={exportToCSV}
        >
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:glass-accent cursor-pointer"
          onClick={exportToJSON}
        >
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (isLoading) {
    return (
      <Card className="glass-card col-span-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
              Campaign Performance
              <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
            </CardTitle>
            <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-4">
              <Skeleton className="h-10 w-full md:w-64 rounded-lg" />
              <Skeleton className="h-10 w-full md:w-32 rounded-lg" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-light-gray/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="glass-light border-b border-light-gray/20 hover:bg-transparent">
                  {[...Array(9)].map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-6 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(9)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card col-span-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
            Campaign Performance
            <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
          </CardTitle>
          <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-4">
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 glass-light border-light-gray/30 focus:border-warm-cream/50"
            />
            <ExportButton />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="rounded-lg border border-light-gray/20 overflow-hidden"
          onScroll={isMobile ? handleScroll : undefined}
          style={isMobile ? { maxHeight: '500px', overflowY: 'auto' } : {}}
        >
          {isMobile ? (
            <div className="space-y-4 p-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="glass-light animate-fade-in-up">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-charcoal">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getStatusColor(campaign.status)} backdrop-blur-sm text-xs`}>
                            {campaign.status}
                          </Badge>
                          <span className="text-sm text-light-gray">{campaign.channel}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="glass-light hover:glass-accent h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="glass-light backdrop-blur-md border border-light-gray/30"
                        >
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer text-red-600">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-light-gray">Budget</p>
                      <p className="text-charcoal">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-light-gray">Spend</p>
                      <p className="text-charcoal">${campaign.spend.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-light-gray">CTR</p>
                      <p className="text-charcoal">{campaign.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-light-gray">Conversions</p>
                      <p className="text-charcoal">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-light-gray">ROI</p>
                      <p className="text-stone-500 font-medium">{campaign.roi}x</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredCampaigns.length < campaigns.length && (
                <Button
                  onClick={loadMore}
                  variant="ghost"
                  className="w-full glass-accent hover:glass-glow"
                >
                  Load More
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="glass-light border-b border-light-gray/20 hover:bg-transparent">
                  <TableHead className="text-charcoal font-medium">Campaign</TableHead>
                  <TableHead className="text-charcoal font-medium">Status</TableHead>
                  <TableHead className="text-charcoal font-medium">Channel</TableHead>
                  <TableHead className="text-charcoal font-medium">Budget</TableHead>
                  <TableHead className="text-charcoal font-medium">Spend</TableHead>
                  <TableHead className="text-charcoal font-medium">CTR</TableHead>
                  <TableHead className="text-charcoal font-medium">Conversions</TableHead>
                  <TableHead className="text-charcoal font-medium">ROI</TableHead>
                  <TableHead className="text-charcoal font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign, index) => (
                  <TableRow
                    key={campaign.id}
                    className="border-b border-light-gray/10 hover:glass-light transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium text-charcoal">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(campaign.status)} backdrop-blur-sm`}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-light-gray">{campaign.channel}</TableCell>
                    <TableCell className="text-charcoal">${campaign.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-charcoal">${campaign.spend.toLocaleString()}</TableCell>
                    <TableCell className="text-charcoal">{campaign.ctr}%</TableCell>
                    <TableCell className="text-charcoal">{campaign.conversions}</TableCell>
                    <TableCell className="text-warm-cream font-medium">{campaign.roi}x</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="glass-light hover:glass-accent h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="glass-light backdrop-blur-md border border-light-gray/30"
                        >
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:glass-accent cursor-pointer text-red-600">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        {!isMobile && filteredCampaigns.length < campaigns.length && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={loadMore}
              variant="ghost"
              className="glass-accent hover:glass-glow"
            >
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}