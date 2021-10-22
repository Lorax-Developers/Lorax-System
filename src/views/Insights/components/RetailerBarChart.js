import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";

const RetailerBarChart = (props) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Number of bottles delivered vs purchased by consumers per month
                </CardTitle>
                <div className="chart-container">
                    <BarChart data={props.dataNumbersBarChart} />
                </div>
            </CardBody>
        </Card>
    )
}

export default RetailerBarChart;