import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import { connect } from "react-redux";

const mapState = state => ({
    suppliers: state.suppliers,
    suppliersRisk: state.suppliersRisk
});

const BUCKETS = ["0-20", "20-40", "40-60", "60-80", "80-100"];

const data = {
    labels: ["low", "", "", "", "high"],
    datasets: [
        {
            backgroundColor: [
                "rgba(255, 0, 0, 0.2)",
                "rgba(255, 0, 0, 0.4)",
                "rgba(255, 0, 0, 0.6)",
                "rgba(255, 0, 0, 0.8)",
                "rgba(255, 0, 0, 1.0)"
            ],
            data: [5, 6, 4, 3, 2]
        }
    ]
}

const options = {
    plugins: {
        datalabels: {
            display: true
        } 
    },
    animation: false,
    layout: {
        padding: {
            left: 12,
            right: 12,
            top: 24,
            bottom: 0
        }
    },
    responsive: false,
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    tooltips: {
        enabled: true,
        callbacks: {
            label: tooltipItem => `${tooltipItem.value} Suppliers`,
            title: tooltipItem => {
                console.log(tooltipItem[0]);
                const bucket = `${BUCKETS[tooltipItem[0].index]} score`;
                return bucket;
            }
        }
    },
    scales: {
        xAxes: [
            {
                // display: false,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            }
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: "# Suppliers"
                }
            }
        ]
    }
}

class SuppliersChart extends Component {

    render = () => {
        const buckets = [0, 0, 0, 0, 0];
        Object.values(this.props.suppliersRisk).map(risk => risk.impact || 100).forEach(impact => {
            const bucket = Math.min(Math.floor(impact/ 20), 4);
            buckets[bucket]++;
        });
        data.datasets[0].data = buckets;
        return <div style={{backgroundColor: "#dcdcdc"}}>
            <Bar data={data} options={options} height={194} width={344}></Bar>
        </div>
    }
}

export default connect(mapState)(SuppliersChart);
