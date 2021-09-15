import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";

const TotalRecycledChart = (props) => {
    console.log(props.dataNumbersBarChart)
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Number of bottles recycled per month
                </CardTitle>
                <div className="chart-container">
                    <BarChart data={props.dataNumbersBarChart} />
                </div>
            </CardBody>
        </Card>
    )
}

export default TotalRecycledChart;