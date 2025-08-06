import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
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
  return (
    <Card className="glass-card animate-scale-in col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
          Revenue Trend
          <div className="w-2 h-2 rounded-full bg-warm-cream animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--light-gray) / 0.3)" />
            <XAxis 
              dataKey="month" 
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-light backdrop-blur-md rounded-lg p-4 border border-light-gray/30 shadow-lg">
                      <p className="text-sm font-medium text-charcoal mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
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
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--warm-cream))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--warm-cream))', strokeWidth: 2 }}
              name="Current Year"
            />
            <Line
              type="monotone"
              dataKey="previousYear"
              stroke="hsl(var(--light-gray))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--light-gray))', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: 'hsl(var(--light-gray))', strokeWidth: 2 }}
              name="Previous Year"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}