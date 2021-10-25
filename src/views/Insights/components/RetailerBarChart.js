import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";
import { chartTooltip } from "../../../components/charts/util";

const RetailerBarChart = (props) => {
    const config = {
        legend: {
          position: 'bottom',
          labels: {
            padding: 30,
            usePointStyle: true,
            fontSize: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 1,
                color: 'rgba(0,0,0,0.1)',
                drawBorder: false
              },
              ticks: {
                beginAtZero: true,
                stepSize: 100,
                min: 0,
                max: 1300,
                padding: 20
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: chartTooltip
      }
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Number of bottles delivered vs purchased by consumers per month
                </CardTitle>
                <div className="chart-container">
                    <BarChart config={config} data={props.dataNumbersBarChart} />
                </div>
            </CardBody>
        </Card>
    )
}

export default RetailerBarChart;