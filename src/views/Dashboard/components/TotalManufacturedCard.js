import React from "react";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IconCard from "../../../components/cards/IconCard";

const TotalManufacturedCard = (props) => {
    const dataNumbers = props.dataNumbers;
    return (

        <Colxx xl="4" lg="6" className="mb-4">

            <IconCard
                icon={"iconsminds-factory"}
                title={'Total bottles Manufactured'}
                value={dataNumbers.TotalNumberOfBottles}
            />
        </Colxx>


    );
};

export default TotalManufacturedCard;