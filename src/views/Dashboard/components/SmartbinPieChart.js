import React, { useEffect, useState } from "react";
import {  Card,  CardBody,  CardTitle} from "reactstrap";

import {PolarAreaChart} from "../../../components/charts"

import { ThemeColors } from '../../../helpers/ThemeColors'
const colors = ThemeColors()


const SmartbinPieChart = (props) => {
  const [polarAreaChartData, setpolarAreaChartData] = useState({});

  useEffect(() => {
    
    const dataNumbers = props.dataNumbers;

    setpolarAreaChartData({
      labels: ['At Manufactured', 'At Outgoing', "At Delivered", "At Purchased", "At Deposited", "At Recycled"],
      datasets: [
        {
          data: [dataNumbers.TotalNumberAtManufactured, dataNumbers.TotalNumberAtOutgoing, dataNumbers.TotalNumberAtDelivered, dataNumbers.TotalNumberAtPurchased, dataNumbers.TotalNumberAtDeposited, dataNumbers.TotalNumberAtRecycled],
          borderWidth: 2,
          borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3, colors.themeColor4, colors.themeColor5, colors.themeColor6],
          backgroundColor: [
            colors.themeColor1_10,
            colors.themeColor2_10,
            colors.themeColor3_10,
            colors.themeColor4_10,
            colors.themeColor5_10,
            colors.themeColor6_10
          ]
        }
      ]
    })
  }, [props.dataNumbers])



  return (
    <Card>
      <CardBody>
        <CardTitle>
        Bottle Lifecycle Analysis
        </CardTitle>
        <div className="chart-container">
          <PolarAreaChart shadow data={polarAreaChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SmartbinPieChart;
