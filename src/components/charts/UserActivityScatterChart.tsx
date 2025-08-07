import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

// Random data generator similar to MUI example
const generateRandomData = () => {
    const data = [];
    for (let i = 1; i <= 12; i++) {
        data.push({
            id: i,
            month: i,
            x1: Math.random() * 100 + 10, // Random x values between 10-110
            y1: Math.random() * 50000 + 20000, // Series A: Active users 20k-70k
            y2: Math.random() * 30000 + 15000, // Series B: New users 15k-45k
        });
    }
    return data;
};

const data = generateRandomData();

export function UserActivityScatterChart() {
    // Transform data for multiple series like MUI example
    const seriesAData = data.map((item) => ({
        x: item.x1,
        y: item.y1,
        month: item.month,
        id: item.id,
    }));

    const seriesBData = data.map((item) => ({
        x: item.x1,
        y: item.y2,
        month: item.month,
        id: item.id,
    }));

    return (
        <Card className="glass-card animate-scale-in">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                    User Activity Scatter
                    <div className="w-2 h-2 rounded-full bg-warm-orange animate-pulse"></div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--light-gray) / 0.3)" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            domain={[0, 120]}
                            stroke="hsl(var(--light-gray))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            name="Engagement Score"
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            stroke="hsl(var(--light-gray))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                            name="Users"
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="glass-light backdrop-blur-md rounded-lg p-4 border border-light-gray/30 shadow-lg">
                                            <p className="text-sm font-medium text-charcoal mb-2">
                                                Month {payload[0]?.payload?.month}
                                            </p>
                                            {payload.map((entry, index) => (
                                                <p key={index} className="text-sm text-charcoal">
                                                    {entry.name}: {entry.value?.toLocaleString?.()} users
                                                </p>
                                            ))}
                                            <p className="text-sm text-amber-300 font-medium">
                                                Engagement: {payload[0]?.payload?.x?.toFixed(1)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{
                                fontSize: '12px',
                                color: 'hsl(var(--light-gray))'
                            }}
                        />
                        <Scatter
                            name="Active Users"
                            data={seriesAData}
                            fill="hsl(var(--warm-orange))"
                            className="hover:opacity-80 transition-opacity duration-200"
                        />
                        <Scatter
                            name="New Users"
                            data={seriesBData}
                            fill="hsl(var(--light-gray))"
                            className="hover:opacity-80 transition-opacity duration-200"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}