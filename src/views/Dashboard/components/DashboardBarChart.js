import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import {
    BarChart,
  } from "../../../components/charts";
  
  import {
    barChartData,
  } from "../../../data/charts";

  
const DashboardBarChart = () => {
    return(
        <Card>
              <CardBody>
                <CardTitle>
                Monthly recycling levels
                </CardTitle>
                    <CardSubtitle>
                      Bottles recycled per month
                    </CardSubtitle>
                    <div className="chart-container">
                      <BarChart  data={barChartData} />
                    </div>
              </CardBody>
            </Card>
    )
}

export default DashboardBarChart;