import React from "react";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IconCard from "../../../components/cards/IconCard";

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