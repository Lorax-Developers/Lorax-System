import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalInStock = (props) => {
  const stockData = props.stockData;
  return (
    <IconCard
      icon={"iconsminds-factory"}
      title={'Total number of bottles in stock'}
      value={stockData.instock}
    />

  );
};

export default TotalInStock;