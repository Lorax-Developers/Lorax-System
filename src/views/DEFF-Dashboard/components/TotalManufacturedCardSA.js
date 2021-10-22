import React from "react";
import IconCard from "../../../../src/components/cards/IconCard";

const TotalManufacturedCardSA = (props) => {
    const dataNumbers = props.dataNumbers;
    return (
        <IconCard
            icon={"iconsminds-factory"}
            title={'Total number of bottles manufactured in South Africa'}
            value={dataNumbers.TotalNumberOfBottles}
        />
    );
};

export default TotalManufacturedCardSA;