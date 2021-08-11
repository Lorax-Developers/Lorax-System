import React from 'react'
import Sortable from "react-sortablejs";

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
    <Sortable options={{handle: ".handle"}} className="row">
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={`${gT(dataNumbers.TotalNumberOfBottles)} Manufactured`}
        percent={100}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={`${gT(dataNumbers.TotalNumberAtPurchased)} Purchased`}
        percent={cP(dataNumbers.TotalNumberAtPurchased)}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={`${gT(dataNumbers.TotalNumberAtDeposited)} Deposited`}
        percent={cP(dataNumbers.TotalNumberAtDeposited)}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={`${gT(dataNumbers.TotalNumberAtRecycled)} Recycled`}
        percent={cP(dataNumbers.TotalNumberAtRecycled)}
        isSortable={true}
      />
    </Colxx>
  </Sortable>
  )
}
export default SortableStaticticsRow
