import React from "react";
import IconCard from "../../../components/cards/IconCard";

const LoraxTokensCard = (props) => {
  const dataNumbers = props.dataNumbers;
  return (
    <IconCard
      icon={"iconsminds-money-bag"}
      title={'Lorax Tokens Balance'}
      value={dataNumbers * 10}
    />

  );
};

export default LoraxTokensCard;