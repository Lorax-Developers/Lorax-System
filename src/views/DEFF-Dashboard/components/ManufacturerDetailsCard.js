import React from "react";
import {
  Card, CardText, CardBody,
  CardTitle,
} from 'reactstrap';

const ManufacturerDetailsCard = (props) => {

  const manufacturerData = props.manufacturerData;
  let today = new Date().toLocaleDateString()

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5" style={{ fontweight: "bold" }}>{manufacturerData.myName} </CardTitle>
          <CardText tag="h6" className="mb-2 text-muted">City: {manufacturerData.myCity}</CardText>
          <CardText tag="h6" className="mb-2 text-muted">Province: {manufacturerData.myProvince}</CardText>
          <CardText tag="h6" className="mb-2 text-muted">Date: {today}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManufacturerDetailsCard;