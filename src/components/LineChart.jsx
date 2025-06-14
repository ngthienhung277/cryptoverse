import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
} from 'chart.js';

const { Title: AntTitle } = Typography;

// Đăng ký các thành phần cần thiết của ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    if (!coinHistory?.data?.history) return null;
    console.log('chart data:', coinHistory);

    // Tách dữ liệu giá và thời gian
    const coinPrice = coinHistory.data.history.map(item => item.price);
    const coinTimestamp = coinHistory.data.history.map((item, i) =>
        new Date(coinHistory?.data?.history?.[i]?.timestamp * 1000).toLocaleDateString()
    );

    // Cấu hình dữ liệu cho Chart
    const data = {
        labels: coinTimestamp.reverse(), // đảo ngược để thời gian từ cũ đến mới
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice.reverse(),
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                tension: 0.3, // đường cong nhẹ
            },
        ],
    };

    // Cấu hình options cho Chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: value => `$${value}`,
                },
            },
            x: {
                ticks: {
                    maxTicksLimit: 10,
                },
            },
        },
    };

    return (
        <>
            <div className="chart-header">
                <AntTitle level={2} className="chart-title">{coinName} Price Chart</AntTitle>
                <div className="price-container">
                    <AntTitle level={5} className="price-change">
                        Change: {coinHistory?.data?.change}%
                    </AntTitle>
                    <AntTitle level={5} className="current-price">
                        Current {coinName} Price: ${currentPrice}
                    </AntTitle>
                </div>
            </div>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
