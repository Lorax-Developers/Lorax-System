import React from "react";
import {
    Card, CardBody, CardTitle
} from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";
//1)import the below
import { chartTooltip } from "../../../components/charts/util";

const TotalDepositedChart = (props, { className = "", controls = true }) => {
    console.log(props.dataNumbersBarChart)
    //2)personalisation starts here
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
                stepSize: 15,
                min: 0,
                max: 150,
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
      //personalisation ends here
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Number of bottles deposited per month
                </CardTitle>
                <div className="chart-container">
                    {/*3) add config={config} */}
                    <BarChart config={config} data={props.dataNumbersBarChart} />
                </div>

            </CardBody>
        </Card>
    )
}

export default TotalDepositedChart;