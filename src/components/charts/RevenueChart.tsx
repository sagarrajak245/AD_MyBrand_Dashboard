import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mockData = [
  { month: 'Jan', revenue: 65000, previousYear: 55000 },
  { month: 'Feb', revenue: 72000, previousYear: 62000 },
  { month: 'Mar', revenue: 68000, previousYear: 58000 },
  { month: 'Apr', revenue: 81000, previousYear: 71000 },
  { month: 'May', revenue: 89000, previousYear: 79000 },
  { month: 'Jun', revenue: 95000, previousYear: 85000 },
  { month: 'Jul', revenue: 102000, previousYear: 92000 },
  { month: 'Aug', revenue: 98000, previousYear: 88000 },
  { month: 'Sep', revenue: 115000, previousYear: 105000 },
  { month: 'Oct', revenue: 125000, previousYear: 115000 },
  { month: 'Nov', revenue: 138000, previousYear: 125000 },
  { month: 'Dec', revenue: 145000, previousYear: 135000 },
];

export function RevenueChart() {
  const [data, setData] = useState<typeof mockData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [visibleMonths, setVisibleMonths] = useState(6); // Start with 6 months on mobile

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset visible months when switching between mobile/desktop
    setVisibleMonths(isMobile ? 6 : 12);
  }, [isMobile]);

  const handleLoadMore = () => {
    setVisibleMonths(prev => Math.min(prev + 3, 12));
  };

  const displayedData = data.slice(0, visibleMonths);

  if (isLoading) {
    return (
      <Card className="glass-card col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
          Revenue Trend
          <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <LineChart
              data={displayedData}
              margin={{
                top: 5,
                right: isMobile ? 10 : 30,
                left: isMobile ? -10 : 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--light-gray) / 0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--light-gray))"
                fontSize={isMobile ? 10 : 12}
                tickLine={false}
                axisLine={false}
                interval={isMobile ? Math.ceil(visibleMonths / 6) - 1 : 0}
              />
              <YAxis
                stroke="hsl(var(--light-gray))"
                fontSize={isMobile ? 10 : 12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={isMobile ? 40 : 60}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-light backdrop-blur-md rounded-lg p-3 border border-light-gray/30 shadow-lg text-sm">
                        <p className="font-medium text-charcoal mb-1">{label}</p>
                        {payload.map((entry, index) => (
                          <p
                            key={index}
                            className="flex items-center"
                            style={{ color: entry.color }}
                          >
                            <span
                              className="inline-block w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: entry.color }}
                            />
                            {entry.name}: ${entry.value?.toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--warm-cream))"
                strokeWidth={isMobile ? 2 : 3}
                dot={{
                  fill: 'hsl(var(--warm-cream))',
                  strokeWidth: 2,
                  r: isMobile ? 3 : 4
                }}
                activeDot={{
                  r: isMobile ? 5 : 6,
                  stroke: 'hsl(var(--warm-cream))',
                  strokeWidth: 2
                }}
                name="Current Year"
              />
              <Line
                type="monotone"
                dataKey="previousYear"
                stroke="hsl(var(--light-gray))"
                strokeWidth={isMobile ? 1.5 : 2}
                dot={{
                  fill: 'hsl(var(--light-gray))',
                  strokeWidth: 2,
                  r: isMobile ? 2 : 3
                }}
                activeDot={{
                  r: isMobile ? 4 : 5,
                  stroke: 'hsl(var(--light-gray))',
                  strokeWidth: 2
                }}
                name="Previous Year"
                strokeDasharray={isMobile ? "3 3" : "5 5"}
              />
            </LineChart>
          </ResponsiveContainer>

          {isMobile && visibleMonths < 12 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="text-sm glass-accent hover:glass-glow px-4 py-2 rounded-lg transition-colors"
              >
                Load More Months
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}