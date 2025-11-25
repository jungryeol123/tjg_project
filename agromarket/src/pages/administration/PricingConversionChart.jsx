import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PricingConversionChart({
    labels,
    prices,
    clicks,
    orders,
    rates,
    aiRates,
    aiClickRates
}) {
    const data = {
        labels,
        datasets: [
            {
                label: "현재 가격(원)",
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                data: prices,
            },
            {
                label: "클릭수",
                backgroundColor: "rgba(54, 162, 235, 0.4)",
                data: clicks,
            },
            {
                label: "구매수",
                backgroundColor: "rgba(255, 159, 64, 0.4)",
                data: orders,
            },
            {
                label: "전환율(%)",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                data: rates,
            },
            {
                label: "AI 예측 전환율(%)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: aiRates,
            },
            {
                label: "AI 예측 클릭률(%)",
                backgroundColor: "rgba(255, 206, 86, 0.5)",
                data: aiClickRates,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
    };

    return (
        <div style={{ marginTop: 40 }}>
            <Bar data={data} options={options} />
        </div>
    );
}
