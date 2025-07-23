import { useEffect, useState } from 'react';
import { loadData } from '../utils/localStorageHelpers';
import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

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
    <div className="container" style={{ maxWidth: 'none', width: '100%' }}>
      <h1>📊 Analytics Dashboard</h1>

      <div className="top-right-link">
        <Link to="/journal">Go to Journal</Link>
      </div>

      <p><strong>Total Spending (All Time):</strong> ${totalAllTime.toFixed(2)}</p>

      <div className="chart-row">
        <div className="chart-box">
          <h2>Line Chart</h2>
          <div style={{ width: '100%', height: '300px' }}>
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: 'Spending Over Time',
                    data: amounts,
                    borderColor: 'blue',
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div className="chart-box">
          <h2>Pie Chart</h2>
          <div style={{ width: '100%', height: '300px' }}>
            <Pie
              data={{
                labels: pieLabels,
                datasets: [
                  {
                    data: pieData,
                    backgroundColor: [
                      '#42a5f5',
                      '#66bb6a',
                      '#ffa726',
                      '#ab47bc',
                      '#ef5350',
                      '#29b6f6',
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}