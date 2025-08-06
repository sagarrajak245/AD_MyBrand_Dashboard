import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Organic Search', value: 45, color: 'hsl(var(--warm-cream))' },
  { name: 'Direct', value: 25, color: 'hsl(var(--light-gray))' },
  { name: 'Social Media', value: 20, color: 'hsl(var(--charcoal))' },
  { name: 'Referral', value: 10, color: 'hsl(var(--light-silver))' },
];

export function TrafficSourcesChart() {
  return (
    <Card className="glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
          Traffic Sources
          <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="glass-light backdrop-blur-md rounded-lg p-4 border border-light-gray/30 shadow-lg">
                      <p className="text-sm font-medium text-charcoal">{data.name}</p>
                      <p className="text-sm text-warm-cream font-medium">{data.value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {payload?.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm text-charcoal">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}