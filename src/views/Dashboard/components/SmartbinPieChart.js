import React from "react";
import {  Card,  CardBody,  CardTitle} from "reactstrap";

import {PolarAreaChart} from "../../../components/charts"

import { polarAreaChartData } from "../../../data/charts";

const SmartbinPieChart = ({chartClass="chart-container"}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
        Smartbin Deposit Analysis
        </CardTitle>
        <div className={chartClass}>
          <PolarAreaChart shadow data={polarAreaChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SmartbinPieChart;
