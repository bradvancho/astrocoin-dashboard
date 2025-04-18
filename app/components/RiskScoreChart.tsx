'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RiskScoreData {
  timestamp: string;
  risk_score: number;
}

interface RiskScoreChartProps {
  data: RiskScoreData[];
}

export default function RiskScoreChart({ data }: RiskScoreChartProps) {
  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis 
            domain={[0, 100]}
            label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value) => [`${value}%`, 'Risk Score']}
          />
          <Line 
            type="monotone" 
            dataKey="risk_score" 
            stroke="#ff6b6b" 
            strokeWidth={2}
            dot={false}
            name="Risk Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 