import {BarChart,Bar,XAxis,YAxis,Tooltip, Legend,ResponsiveContainer,} from "recharts";
  
const MyBarChart = (expenses) => {
    const calculateMonthlyCategoryTotals = (expenses) => {
        return expenses.reduce((acc, item) => {
          const date = new Date(item.date);
          const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; 
          const category = item.category;
      
          if (!acc[yearMonth]) acc[yearMonth] = {};
          if (!acc[yearMonth][category]) acc[yearMonth][category] = 0;
      
          acc[yearMonth][category] += item.amount;
          return acc;
        }, {});
    };
      
    const formatDataForRecharts = (monthlyTotals) => {
    return Object.entries(monthlyTotals).map(([month, categories]) => ({
        month,
        ...categories,
    }));
    };
    const monthlyTotals = calculateMonthlyCategoryTotals(expenses.expenses);
    const chartData = formatDataForRecharts(monthlyTotals);
return (
    <ResponsiveContainer width="90%" height={300}>
    <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Food" fill="#FF6384" />
        <Bar dataKey="Transport" fill="#36A2EB" />
        <Bar dataKey="Entertainment" fill="#FFCE56" />
        <Bar dataKey="Bills" fill="#6A5ACD" /> 
        <Bar dataKey="Shopping" fill="#008080" />
        <Bar dataKey="Other" fill="#32CD32" /> 
    </BarChart>
    </ResponsiveContainer>
);
};

export default MyBarChart;


