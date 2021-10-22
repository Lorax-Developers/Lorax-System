import React from 'react'
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import RadialProgressCard from "../../../components/cards/RadialProgressCard";


const SortableStaticticsRow = (props) => {
  const dataNumbers = props.dataNumbers;

  //Function to calculate percentage
  const cP = (val) => {
    return val === 0 ? 0 : Math.round((val / dataNumbers.TotalNumberOfBottles) * 100);
  }
  //Function to return single or plural title
  const gT = (val) => {
    return `${val} ${val === 0 || val > 1 ? "Bottles" : "Bottle"}`
  }
  return (
    <Row>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtManufactured)} Manufactured`}
          percent={cP(dataNumbers.TotalNumberAtManufactured)}
          isSortable={true}
        />
      </Colxx>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtOutgoing)} Outgoing`}
          percent={cP(dataNumbers.TotalNumberAtOutgoing)}
          isSortable={true}
        />
      </Colxx>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtDelivered)} Delivered`}
          percent={cP(dataNumbers.TotalNumberAtDelivered)}
          isSortable={true}
        />
      </Colxx>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtPurchased)} Purchased`}
          percent={cP(dataNumbers.TotalNumberAtPurchased)}
          isSortable={true}
        />
      </Colxx>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtDeposited)} Deposited`}
          percent={cP(dataNumbers.TotalNumberAtDeposited)}
          isSortable={true}
        />
      </Colxx>
      <Colxx xl="4" lg="6" md="6" className="mb-4">
        <RadialProgressCard
          title={`${gT(dataNumbers.TotalNumberAtRecycled)} Recycled`}
          percent={cP(dataNumbers.TotalNumberAtRecycled)}
          isSortable={true}
        />
      </Colxx>

    </Row>
  )
}
export default SortableStaticticsRow
