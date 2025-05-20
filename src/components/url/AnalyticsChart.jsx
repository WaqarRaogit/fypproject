import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsChart = ({ data, chartType }) => {
  // Transform the data for charts
  const chartData = useMemo(() => {
    if (chartType === 'location') {
      // Group data by city
      const cityData = [];
      let totalClicks = 0;
      
      Object.entries(data).forEach(([city, hours]) => {
        const cityClicks = Object.values(hours).reduce((sum, clicks) => sum + clicks, 0);
        totalClicks += cityClicks;
        cityData.push({ name: city, value: cityClicks });
      });
      
      // Sort by clicks and calculate percentages
      return cityData
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          percent: ((item.value / totalClicks) * 100).toFixed(1)
        }));
    } else {
      // Group data by hour
      const hourData = {};
      
      Object.values(data).forEach(hours => {
        Object.entries(hours).forEach(([hour, clicks]) => {
          hourData[hour] = (hourData[hour] || 0) + clicks;
        });
      });
      
      // Convert to array and sort by hour
      return Object.entries(hourData)
        .map(([hour, clicks]) => ({
          hour: `${hour}:00`,
          clicks
        }))
        .sort((a, b) => {
          const hourA = parseInt(a.hour.split(':')[0]);
          const hourB = parseInt(b.hour.split(':')[0]);
          return hourA - hourB;
        });
    }
  }, [data, chartType]);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#F44336', '#3F51B5'];

  if (chartType === 'location') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] p-6 rounded-xl border border-blue-900/30">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} clicks`, 'Clicks']}
                contentStyle={{ background: '#1A1F2C', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#93C5FD' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Legend 
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-[#111827] p-6 rounded-xl border border-blue-900/30">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-blue-900/30">
              <thead className="bg-[#1A1F2C] sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {chartData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#1E2330] transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {item.percent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Time chart
  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-blue-900/30">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
          <XAxis 
            dataKey="hour" 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <YAxis 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <Tooltip
            contentStyle={{ 
              background: '#1A1F2C', 
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.5rem'
            }}
            itemStyle={{ color: '#93C5FD' }}
            labelStyle={{ color: '#E5E7EB' }}
          />
          <Bar 
            dataKey="clicks" 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill="#3B82F6"
                fillOpacity={0.8}
                className="hover:fill-opacity-100 transition-all duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;