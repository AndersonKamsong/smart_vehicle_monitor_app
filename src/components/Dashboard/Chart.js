import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineGraph = ({ data }) => {
    // const sampleData = [43, 100, 50, 40, 70, 40, 45, 73, 40, 60, 40, 80, 100];

    const canvasData = {
        datasets: [
            {
                label: "Home",
                borderColor: "navy",
                pointRadius: 0,
                fill: true,
                backgroundColor: 'yellow',
                lineTension: 0.4,
                data: data.datasets,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                labels: data.labels,
                ticks: {
                    color: "red",
                    font: {
                        family: "Nunito",
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                min: data.min,
                max: data.max,
                ticks: {
                    stepSize: data.stepSize,
                    color: "green",
                    font: {
                        family: "Nunito",
                        size: 12,
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    const graphStyle = {
        minHeight: "10rem",
        maxWidth: "540px",
        width: "100%",
        border: "1px solid #C4C4C4",
        borderRadius: "0.375rem",
        padding: "0.5rem",
    };

    return (
        <div style={graphStyle}>
            <Line id="home" options={options} data={canvasData} />
        </div>
    );
};

export default LineGraph;