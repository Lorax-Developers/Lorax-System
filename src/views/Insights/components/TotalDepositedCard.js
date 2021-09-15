import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalDepositedCard = (props) => {
  const dataNumbers = props.dataNumbers;
  return (
    <IconCard
      icon={"iconsminds-factory"}
      title={'Total number of bottles deposited'}
      value={dataNumbers.TotalNumberAtDeposited}
    />

  );
};

export default TotalDepositedCard;