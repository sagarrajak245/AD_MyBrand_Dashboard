import { useState } from "react";
import { Eye, Edit, Copy, Archive, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-warm-cream/20 text-warm-cream border-warm-cream/30';
      case 'Paused':
        return 'bg-light-gray/20 text-light-gray border-light-gray/30';
      case 'Completed':
        return 'bg-charcoal/20 text-charcoal border-charcoal/30';
      default:
        return 'bg-light-gray/20 text-light-gray border-light-gray/30';
    }
  };

  return (
    <Card className="glass-card animate-scale-in col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
            Campaign Performance
            <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
          </CardTitle>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 glass-light border-light-gray/30 focus:border-warm-cream/50"
            />
            <Button className="glass-accent hover:glass-glow">
              Export Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-light-gray/20 overflow-hidden">
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
        </div>
      </CardContent>
    </Card>
  );
}