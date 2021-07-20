import React from "react";
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import { AreaChart } from "../../../components/charts";

import { areaChartData } from "../../../data/charts";

const RecyclingLineGraph = ({ className = "", controls = true }) => {
  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              Daily Recycling Levels
            </h5>
            <span className="text-muted text-small d-block">
             &nbsp;
            </span>
            <span className="text-muted text-small d-block">
              Bottles recycled per day
            </span>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
           {<UncontrolledDropdown>
            <DropdownToggle caret color="secondary" className="btn-xs" outline>
              This week
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Last Week
              </DropdownItem>
              <DropdownItem>
                This Month
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>}
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={areaChartData} />
      </div>
    </Card>
  );
};

export default RecyclingLineGraph;
