/* eslint-disable react/jsx-pascal-case */
import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Manufacturer_Profiling from "../../components/Manufacturer_Profiling/Manufacturer_Profiling";


const Manufacturer = () => {
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Manufacturer's Profile</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Manufacturer_Profiling/>
        </AppLayout>
    )
  }
  
  export default Manufacturer;