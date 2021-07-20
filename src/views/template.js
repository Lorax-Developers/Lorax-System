import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";



const Template = () => {
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>LORAX Template</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <p>template</p>
              </Colxx>
            </Row>
        </AppLayout>
    )
}
export default Template;