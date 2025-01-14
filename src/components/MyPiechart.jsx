import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [ "#4ECDC4", "#FF6B6B","#1E90FF",'#FF69B4', '#32CD32', '#87CEEB'];

const MyPieChart = ({groupedData}) => {
  return (
    <PieChart width={320} height={320}>
      <Pie
        data={groupedData}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {groupedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MyPieChart;
