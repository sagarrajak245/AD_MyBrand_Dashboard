import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { channel: 'Social', spend: 45000, conversions: 890, roas: 3.2 },
  { channel: 'Search', spend: 62000, conversions: 1240, roas: 4.1 },
  { channel: 'Display', spend: 38000, conversions: 520, roas: 2.8 },
  { channel: 'Email', spend: 28000, conversions: 780, roas: 5.2 },
  { channel: 'Video', spend: 51000, conversions: 680, roas: 3.7 },
];

export function ChannelPerformanceChart() {
  return (
    <Card className="glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
          Channel Performance
          <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--light-gray) / 0.3)" />
            <XAxis 
              dataKey="channel" 
              stroke="hsl(var(--light-gray))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--light-gray))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="glass-light backdrop-blur-md rounded-lg p-4 border border-light-gray/30 shadow-lg">
                      <p className="text-sm font-medium text-charcoal mb-2">{label}</p>
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
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}