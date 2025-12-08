import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ForecastChart({ labels, values }) {
  // 🔥 에러 방지 (너 코드 유지 + 안정성 플러스)
  if (!labels || !values || labels.length === 0 || values.length === 0) {
    console.warn("⚠ ForecastChart: labels 혹은 values 없음", { labels, values });
    return <div style={{ color: "gray", padding: "20px" }}>데이터 없음</div>;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "판매량",
        data: values,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3, // 🔥 부드러운 곡선
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: { size: 14, weight: "bold" }
        }
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } }
      },
      y: {
        ticks: { font: { size: 12 } }
      }
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}
