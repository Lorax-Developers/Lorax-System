import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import {
    BarChart,
} from "../../../components/charts";
  

  
const DashboardBarChart = (props) => {
  console.log(props.dataNumbersBarChart)
    return(
        <Card>
              <CardBody>
                <CardTitle>
                Monthly Bottle Recycle Analysis
                </CardTitle>
                    
                    <div className="chart-container">
                      <BarChart  data={props.dataNumbersBarChart} />
                    </div>
              </CardBody>
            </Card>
    )
}

export default DashboardBarChart;