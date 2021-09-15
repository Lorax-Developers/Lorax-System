import React from "react";
import {
    Card, CardBody, CardTitle
} from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";

const TotalDepositedChart = (props, { className = "", controls = true }) => {
    console.log(props.dataNumbersBarChart)
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Number of bottles deposited per month
                </CardTitle>
                <div className="chart-container">
                    <BarChart data={props.dataNumbersBarChart} />
                </div>

            </CardBody>
        </Card>
    )
}

export default TotalDepositedChart;