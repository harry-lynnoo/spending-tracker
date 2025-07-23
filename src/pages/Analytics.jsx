// src/pages/Analytics.jsx
import { useEffect, useState } from 'react';
import { loadData } from '../utils/localStorageHelpers';
import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, ArcElement);

export default function Analytics() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(loadData());
  }, []);

  const totalAllTime = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const labels = entries.map((e) => e.date);
  const amounts = entries.map((e) => parseFloat(e.amount));

  const categoryMap = {};
  entries.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + parseFloat(e.amount);
  });

  const pieLabels = Object.keys(categoryMap);
  const pieData = Object.values(categoryMap);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Analytics Dashboard</h1>
      <p><strong>Total Spending (All Time):</strong> ${totalAllTime.toFixed(2)}</p>
      
      <div style={{ maxWidth: 600 }}>
        <h2>Line Chart</h2>
        <Line
          data={{
            labels,
            datasets: [{ label: 'Spending Over Time', data: amounts, borderColor: 'blue' }],
          }}
        />

        <h2>Pie Chart</h2>
        <Pie
          data={{
            labels: pieLabels,
            datasets: [{
              data: pieData,
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
          }}
        />
      </div>

      <br />
      <Link to="/journal">➕ Go to Journal</Link>
    </div>
  );
}