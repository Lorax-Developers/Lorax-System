import React, { } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, } from "../../../../src/components/common/CustomBootstrap";
const UsersTable = (props) => {

    const usersTableData = props.usersTableData;
    const manufacturers = props.usersTableData.manufacturerArray;
    const retailers = props.usersTableData.retailerArray;
    const consumers = props.usersTableData.consumerArray;
    const wastepickers = props.usersTableData.wastepickerArray;
    const recyclingdepots = props.usersTableData.recyclingdepotArray;
    const pros = props.usersTableData.proArray;
    const provinces = props.usersTableData.provinces;

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
                                    {provinces && provinces.length > 0 ? provinces.map((item) => { return <th>{item}</th> }) : null}
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Manufacturers</td>
                                    {manufacturers && manufacturers.length > 0 ? manufacturers.map((item) => { return <th>{item}</th> }) : null}
                                    <td>{usersTableData.ManufacturerCount}</td>
                                </tr>
                                <tr>
                                    <td>Retailers</td>
                                    {retailers && retailers.length > 0 ? retailers.map((item) => { return <th>{item}</th> }) : null}
                                    <td>{usersTableData.RetailerCount}</td>
                                </tr>
                                <tr>
                                    <td>Consumers</td>
                                    {consumers && consumers.length > 0 ? consumers.map((item) => { return <th>{item}</th> }) : null}
                                    <td>{usersTableData.ConsumerCount}</td>
                                </tr>
                                <tr>
                                    <td>Waste Pickers</td>
                                    {wastepickers && wastepickers.length > 0 ? wastepickers.map((item) => { return <th>{item}</th> }) : null}
                                    <td>{usersTableData.WastePickerCount}</td>
                                </tr>
                                <tr>
                                    <td>Recycling Depots</td>
                                    {recyclingdepots && recyclingdepots.length > 0 ? recyclingdepots.map((item) => { return <th>{item}</th> }) : null}
                                    <td>{usersTableData.RecyclingDepotCount}</td>
                                </tr>
                                <tr>
                                    <td>Producer Responsbility Organisations</td>
                                    {pros && pros.length > 0 ? pros.map((item) => { return <th>{item}</th> }) : null}
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
