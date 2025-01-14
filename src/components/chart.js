import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', sales: 12 },
  { name: 'Feb', sales: 19 },
  { name: 'Mar', sales: 3 },
  { name: 'Apr', sales: 5 },
  { name: 'May', sales: 2 },
];

const SimpleLineChart = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default SimpleLineChart;