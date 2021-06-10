import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";


const Scan = (props) => {
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Scan a new product</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
           
        </AppLayout>
    )
}

export default Scan;