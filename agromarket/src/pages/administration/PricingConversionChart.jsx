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
    aiClickRates,
    aiPrices
    }) {
    const data = {
        labels,
        datasets: [
            {
                label: "현재 가격(원)",
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                data: prices,
                yAxisID: "y1",        // ⭐ 오른쪽 Y축
            },
            {
                label: "클릭수",
                backgroundColor: "rgba(54, 162, 235, 0.4)",
                data: clicks,
                yAxisID: "y",         // ⭐ 왼쪽 Y축
            },
            {
                label: "구매수",
                backgroundColor: "rgba(255, 159, 64, 0.4)",
                data: orders,
                yAxisID: "y",
            },
            {
                label: "전환율(%)",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                data: rates,
                yAxisID: "y",
            },
            {
                label: "ai 추천가격(원)",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                data: aiPrices,
                yAxisID: "y1",
            },
            {
                label: "AI 예측 전환율(%)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: aiRates,
                yAxisID: "y",
            },
            {
                label: "AI 예측 클릭률(%)",
                backgroundColor: "rgba(255, 206, 86, 0.5)",
                data: aiClickRates,
                yAxisID: "y",
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            y: {
                type: "linear",
                position: "left",
                title: { display: true, text: "클릭수 / 구매수 / 전환율(%)" }
            },
            y1: {
                type: "linear",
                position: "right",
                grid: { drawOnChartArea: false }, // ⭐ 가격축의 라인은 감춤 (깔끔해짐)
                title: { display: true, text: "가격(원)" }
            }
        }
    };

    return (
        <div style={{ marginTop: 40 }}>
            <Bar data={data} options={options} />
        </div>
    );
}
