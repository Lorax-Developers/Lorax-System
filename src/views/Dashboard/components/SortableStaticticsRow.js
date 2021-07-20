import React from 'react'
import Sortable from "react-sortablejs";

import { Colxx } from "../../../components/common/CustomBootstrap";
import RadialProgressCard from "../../../components/cards/RadialProgressCard";


const SortableStaticticsRow = () => {
  return (
    <Sortable options={{handle: ".handle"}} className="row">
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={"Bottles in Smartbins"}
        percent={64}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={"Bottles with Consumers"}
        percent={75}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={"Bottles at Retailers"}
        percent={32}
        isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={"Bottles in Transit"}
        percent={45}
        isSortable={true}
      />
    </Colxx>
  </Sortable>
  )
}
export default SortableStaticticsRow
