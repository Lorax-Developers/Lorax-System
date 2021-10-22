import React from "react";
import IconCard from "../../../components/cards/IconCard";

const TotalRecycledCardSA = (props) => {
    const dataNumbers = props.dataNumbers;
    return (
        <IconCard
            icon={"iconsminds-factory"}
            title={'Total number of bottles recycled in South Africa'}
            value={dataNumbers.TotalNumberAtRecycled}
        />
    );
};

export default TotalRecycledCardSA;