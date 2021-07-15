import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import UserList from "../../components/userList/UserList";


const Manufacturer = () => {
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Edit Manufacturer's Profile</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <UserList/>
        </AppLayout>
    )
  }
  
  export default Manufacturer;