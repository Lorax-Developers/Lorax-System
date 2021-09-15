import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalRecycledCard = (props) => {
  const dataNumbers = props.dataNumbers;
  return (
    <IconCard
      icon={"iconsminds-factory"}
      title={'Total number of bottles recycled'}
      value={dataNumbers.TotalNumberAtRecycled}
    />
  );
};

export default TotalRecycledCard;