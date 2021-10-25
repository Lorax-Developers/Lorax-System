import React from "react";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {
  Card, CardText, CardBody,
  CardTitle,
} from 'reactstrap';

const ManufacturerDetailsCard = (props) => {

  let today = new Date().toLocaleDateString()

  return (
    <div>

      <Card>
        <CardBody>
          <CardTitle tag="h5">Coca Cola</CardTitle>
          <CardText tag="h6" className="mb-2 text-muted">Cape Town</CardText>
          <CardText tag="h6" className="mb-2 text-muted">Western Cape</CardText>
          <CardText tag="h6" className="mb-2 text-muted">Date: {today}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManufacturerDetailsCard;