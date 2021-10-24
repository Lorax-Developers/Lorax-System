import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalPurchasedCard = (props) => {
  const dataNumbers = props.dataNumbers;
  return (
    <IconCard
      icon={"iconsminds-factory"}
      title={'Total number of bottles sold'}
      value={dataNumbers}
    />

  );
};

export default TotalPurchasedCard;