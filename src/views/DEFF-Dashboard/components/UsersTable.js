import React, { } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
//import IntlMessages from "../../../../src/helpers/IntlMessages";
import { Colxx, } from "../../../../src/components/common/CustomBootstrap";

// export default class UsersTable extends Component {
//     render() {

const UsersTable = (props) => {
    const usersTableData = props.usersTableData;
    return (
        <div>
            <Colxx xxs="12">``
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            Number of Registered Lorax Users
                        </CardTitle>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Manufacturers</td>
                                    <td>{usersTableData.ManufacturerCount}</td>

                                </tr>
                                <tr>
                                    <td>Retailers</td>
                                    <td>{usersTableData.RetailerCount}</td>

                                </tr>
                                <tr>
                                    <td>Consumers</td>
                                    <td>{usersTableData.ConsumerCount}</td>

                                </tr>
                                <tr>
                                    <td>Waste Pickers</td>
                                    <td>{usersTableData.WastePickerCount}</td>

                                </tr>
                                <tr>
                                    <td>Recycling Depots</td>
                                    <td>{usersTableData.RecyclingDepotCount}</td>

                                </tr>
                                <tr>
                                    <td>Producer Responsbility Organisations</td>
                                    <td>{usersTableData.ProCount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card >
            </Colxx >
        </div >
    );
}

export default UsersTable;
