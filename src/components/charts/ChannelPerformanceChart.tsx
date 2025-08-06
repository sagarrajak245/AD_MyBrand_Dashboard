import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mockData = [
  { channel: 'Social', spend: 45000, conversions: 890, roas: 3.2 },
  { channel: 'Search', spend: 62000, conversions: 1240, roas: 4.1 },
  { channel: 'Display', spend: 38000, conversions: 520, roas: 2.8 },
  { channel: 'Email', spend: 28000, conversions: 780, roas: 5.2 },
  { channel: 'Video', spend: 51000, conversions: 680, roas: 3.7 },
];

export function ChannelPerformanceChart() {
  const [data, setData] = useState<typeof mockData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 2, mockData.length));
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="w-full space-y-4">
              <Skeleton className="h-6 w-full" />
              <div className="flex items-end gap-2 h-[250px]">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-full w-full flex-1" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayedData = isMobile ? data.slice(0, visibleItems) : data;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
          Channel Performance
          <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart
              data={displayedData}
              margin={{
                top: 20,
                right: isMobile ? 10 : 30,
                left: isMobile ? -20 : 20,
                bottom: 5,
              }}
              layout={isMobile ? 'vertical' : 'horizontal'}
              barSize={isMobile ? 20 : 40}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--light-gray) / 0.3)"
                horizontal={!isMobile}
                vertical={isMobile}
              />
              {isMobile ? (
                <YAxis
                  dataKey="channel"
                  type="category"
                  stroke="hsl(var(--light-gray))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
              ) : (
                <XAxis
                  dataKey="channel"
                  stroke="hsl(var(--light-gray))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
              )}
              {isMobile ? (
                <XAxis
                  type="number"
                  stroke="hsl(var(--light-gray))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
              ) : (
                <YAxis
                  stroke="hsl(var(--light-gray))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
              )}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-light backdrop-blur-md rounded-lg p-4 border border-light-gray/30 shadow-lg">
                        <p className="text-sm font-medium text-charcoal mb-2">{data.channel}</p>
                        <p className="text-sm text-charcoal">Spend: ${data.spend.toLocaleString()}</p>
                        <p className="text-sm text-charcoal">Conversions: {data.conversions}</p>
                        <p className="text-sm text-warm-cream font-medium">ROAS: {data.roas}x</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="conversions"
                fill="hsl(var(--warm-cream))"
                radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </BarChart>
          </ResponsiveContainer>

          {isMobile && visibleItems < data.length && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="text-sm glass-accent hover:glass-glow px-4 py-2 rounded-lg transition-colors"
              >
                Load More Channels
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}