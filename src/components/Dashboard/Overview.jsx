import React, { useState } from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Line } from "react-chartjs-2";
// import Chart from './Chart';
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import LineGraph from './Chart';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Overview() {
    const carPerformanceData = [
        {
            title: 'Oil Level',
            percentage: 15,
            icon: 'fa fa-oil-can', // Font Awesome icon for oil
            min: 10,
            max: 20,
            stepSize: 1,
            chartData: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [12, 15, 13, 14],
            },
        },
        {
            title: 'Coolant Temperature',
            percentage: 78,
            icon: 'fa fa-thermometer-half', // Font Awesome icon for thermometer
            min: 20,
            max: 150,
            stepSize: 10,
            chartData: {
                labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4'],
                datasets: [30, 78, 120, 96],
            },
        },
        {
            title: 'Battery Voltage',
            percentage: 42,
            icon: 'fa fa-battery', // Font Awesome icon for battery
            min: 10,
            max: 18,
            stepSize: 0.2,
            chartData: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
                datasets: [12.2, 18.5, 12.3, 15.4],
            },
        },
        {
            title: 'Tire Pressure',
            percentage: 85,
            icon: 'fa fa-wheelchair', // Font Awesome icon for tire
            min: 10,
            max: 40,
            stepSize: 5,
            chartData: {
                labels: ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'],
                datasets: [32, 31, 33, 32],
            },
        },
        {
            title: 'Brake Pad Wear',
            percentage: 20,
            icon: 'fa fa-car-side', // Font Awesome icon for car brake
            min: 0,
            max: 5,
            stepSize: 0.15,
            chartData: {
                labels: ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'],
                datasets: [0.25, 0.28, 0.22, 0.24],
            },
        },
        {
            title: 'Fuel Efficiency',
            percentage: 68,
            icon: 'fa fa-gas-pump', // Font Awesome icon for gas pump
            min: 20,
            max: 40,
            stepSize: 2,
            chartData: {
                labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
                datasets: [25, 28, 22, 24],
            },
        },
        {
            title: 'Engine RPM',
            percentage: 72,
            icon: 'fa fa-tachometer', // Font Awesome icon for tachometer
            min: 700,
            max: 4000,
            stepSize: 500,
            chartData: {
                labels: ['Idle', 'Low', 'Medium', 'High'],
                datasets: [800, 1500, 2500, 3500],
            },
        },
        // Add more items as needed
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [hideMenu, setHideMenu] = useState(carPerformanceData.map(() => false))
    const toggleHideMenu = (index) => {
        setHideMenu((prevHideMenu) => {
            const newHideMenu = [...prevHideMenu]; // Create a copy to avoid mutating the state
            newHideMenu[index] = !newHideMenu[index];
            return newHideMenu;
        });
    };
    const filteredData = carPerformanceData.filter((item) => {
        const searchTextLower = searchTerm.toLowerCase(); // Ensure consistent casing
        return (
            item.title.toLowerCase().includes(searchTextLower)
        );
    });
    const handleSearch = (event) => {
        setHideMenu(carPerformanceData.map(() => false))
        setSearchTerm(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12 col-md-12 box-col-12">
                    <div className="file-content">
                        <div className="card">
                            <div className="cardheader">
                            </div>
                            <div className="card-header d-md-block">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <form className="form-inline" action="#" method="get">
                                        <div className="form-group d-flex mb-0 align-items-center"><i className="fa fa-search"> </i>
                                            <input className="form-control-plaintext"
                                                type="text" onChange={handleSearch}
                                                placeholder="Search..." />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card-body file-manager">
                                <h5 className="mt-4 mb-2"></h5>
                                <ul className="folder">
                                    {filteredData.map((item, index) => (
                                        <li key={index} className="folder-box">
                                            <div className="d-block">
                                                <i className={`f-44 ${item.icon} 
                                                ${item.percentage > 70 ? "font-success" :
                                                        item.percentage > 30 ? "font-warning" : "font-danger"}`}
                                                ></i>
                                                <i className={`f-20 fa ${hideMenu[index] ? "fa-caret-up" : "fa-caret-down"} me-0 f-14 ellips`}
                                                    onClick={() => toggleHideMenu(index)}
                                                    style={{ cursor: "pointer" }}></i>
                                                <div className="mt-3">
                                                    <h6 className="mb-2">
                                                        <i className={item.icon}></i> {item.title}
                                                    </h6>
                                                    <p>
                                                        <span className="pull-right">
                                                            <i className="fa fa-percentage"></i> {item.percentage}%
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            {hideMenu[index] && (
                                                <div>
                                                    <hr />
                                                    <LineGraph data={item.chartData} />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
