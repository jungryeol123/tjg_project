import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  // PointElement,
  Legend,
  Tooltip
);

export default function ConversionChart({ labels, clicks, orders, rates }) {
  const data = {
    labels,
    datasets: [
      {
        label: "클릭수",
        data: clicks,
        borderColor: "rgba(54, 162, 235, 1)", // 파란색
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: "구매수",
        data: orders,
        borderColor: "rgba(255, 159, 64, 1)", // 주황색
        backgroundColor: "rgba(255, 159, 64, 0.3)",
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: "전환율 (%)",
        data: rates,
        borderColor: "rgba(75, 192, 92, 1)", // 초록색
        backgroundColor: "rgba(75, 192, 92, 0.3)",
        borderWidth: 2,
        tension: 0.3,
        yAxisID: "y1"
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "클릭수 / 구매수" }
      },
      y1: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "전환율 (%)" },
        grid: { drawOnChartArea: false }
      }
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}