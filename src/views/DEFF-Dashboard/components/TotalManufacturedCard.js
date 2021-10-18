import React from "react";
import IconCard from "../../../../src/components/cards/IconCard";

const TotalManufacturedCard = (props) => {
    const dataNumbers = props.dataNumbers;
    return (
        <IconCard
            icon={"iconsminds-factory"}
            title={'Total bottles Manufactured'}
            value={dataNumbers.TotalNumberOfBottles}
        />
    );
};

export default TotalManufacturedCard;