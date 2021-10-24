import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalDepositedCard = (props) => {
  const dataNumbers = props.dataNumbers;
  return (
    <IconCard
      icon={"iconsminds-factory"}
      title={'Total number of bottles deposited since registering with Lorax'}
      value={dataNumbers}
    />

  );
};

export default TotalDepositedCard;