import React, { useEffect, useState, } from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss"

import SortableStaticticsRow from './components/SortableStaticticsRow';
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import TotalManufacturedCard from "./components/TotalManufacturedCard"
import ManufacturerDetailsCard from "./components/ManufacturerDetailsCard";
import UserTable from "./components/UsersTable";
import axios from "axios";
import Select from "react-select";

function DEFFDashboard(props) {

    //variable, variable updating function, default value
    const [dropDownData, setDropDownData] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [manufacturerData, setManufacturerData] = useState({});
    const [dataNumbers, setDataNumbers] = useState({});
    const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
    const [usersTableData, setUsersTableData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [madeChoice, setmadeChoice] = useState(true);
    let server = 'http://localhost:5000';


    //Get Manufacturer Data for drop down list 
    const getManufacturers = () => {
        var config = {
            method: 'get',
            url: `${server}/api/User/manufacturerlist`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(function (response) {
                let options = response.data.map(d => ({
                    "value": d._id,
                    "label": d.name
                }))
                options.push({ value: "1234", label: "South Africa" });
                setDropDownData(options)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getManufacturers();

    function onChangeInput({ value }) {
        setSelectedUser(value);
        setmadeChoice(false);
    };

    //Runs when page loads

    useEffect(() => {

        let server = 'http://localhost:5000';

        // if (isLoading === false) {
        if (madeChoice === false) {

            if (selectedUser !== "1234") {
                // Get Data for the manufacturer details Card 
                let getManufacturerDetails = () => {
                    var config = {
                        method: 'get',
                        url: `${server}/api/user/userdetails/${selectedUser}`,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    axios(config)
                        //Successful?
                        .then(function (response) {
                            setManufacturerData(response.data);
                        })
                        //Unsuccessful?
                        .catch(function (error) {
                            console.log(error);
                        });
                }

                getManufacturerDetails();
            }

            //Get further data for the supply chain cards 
            let getCardData = () => {
                var config = {
                    method: 'get',
                    url: `${server}/api/totalbottles?manufacturerId=${selectedUser}`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                axios(config)
                    //Successful?
                    .then(function (response) {
                        setDataNumbers(response.data);
                    })
                    //Unsuccessful?
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            getCardData();

            //Further Data for Manufactured Vs Recycled Bar Chart 
            let getMonthlyData = () => {
                let thisMonth = new Date().getMonth() - 4;
                let statusOne = "Manufactured";
                let statusTwo = "Recycled";

                var config = {
                    method: 'get',
                    url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}&manufacturerId=${selectedUser}`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                axios(config)
                    .then(function (response) {
                        setDataNumbersBarChart(response.data.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            //Get further data for the Registered Users table

            let getUsersData = () => {
                var config = {
                    method: 'get',
                    url: `${server}/api/user/userCount`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                axios(config)
                    //Successful?
                    .then(function (response) {
                        setUsersTableData(response.data);
                    })
                    //Unsuccessful?
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            getMonthlyData();
            getUsersData();
            setIsLoading(false);

        }


    }, [selectedUser, isLoading, madeChoice])
    if (selectedUser === "1234") {
        return (
            <AppLayout>
                <Row>
                    <Colxx xxs="12">
                        <h1>DEFF Dashboard</h1>
                    </Colxx>
                    <Colxx>
                        <Separator className="mb-5" />
                        <Select options={dropDownData} placeholder={"Please select an option"} onChange={onChangeInput}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {
                    isLoading ?

                        "Please wait..."
                        :
                        <>
                            <Row>
                                <SortableStaticticsRow dataNumbers={dataNumbers}></SortableStaticticsRow>
                            </Row>
                            <Row>
                                <Colxx sm="12" md="6" className="mb-4">
                                    <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart"> </SmartbinPieChart>
                                </Colxx>
                                <Colxx sm="12" md="6" className="mb-4">
                                    <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
                                </Colxx>

                            </Row>
                            <Colxx sm="12" md="6" className="mb-4">
                                <UserTable usersTableData={usersTableData}></UserTable>
                            </Colxx>


                        </>
                }
                <br />

            </AppLayout >
        )
    }

    else {
        return (
            <AppLayout>
                <Row>
                    <Colxx xxs="12">
                        <h1>DEFF Dashboard</h1>
                    </Colxx>
                    <Colxx>
                        <Separator className="mb-5" />
                        <Select options={dropDownData} placeholder={"Please select an option"} onChange={onChangeInput}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {
                    isLoading ?

                        "Please wait..."
                        :
                        <>
                            <Row>
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <ManufacturerDetailsCard manufacturerData={manufacturerData}> </ManufacturerDetailsCard>
                                </Colxx>
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <TotalManufacturedCard dataNumbers={dataNumbers} ></TotalManufacturedCard>
                                </Colxx>
                            </Row>
                            <Row>
                                <SortableStaticticsRow dataNumbers={dataNumbers}></SortableStaticticsRow>
                            </Row>
                            <Row>
                                <Colxx sm="12" md="6" className="mb-4">
                                    <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart"> </SmartbinPieChart>
                                </Colxx>
                                <Colxx sm="12" md="6" className="mb-4">
                                    <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
                                </Colxx>

                            </Row>

                            <Row>
                                <Colxx xxs="12">
                                    <h1>Lorax Users Analysis</h1>
                                </Colxx>
                                <Colxx>
                                    <Separator className="mb-5" />
                                    <Colxx sm="12" md="6" className="mb-4">
                                        <UserTable usersTableData={usersTableData}></UserTable>
                                    </Colxx>

                                    <Separator className="mb-5" />
                                </Colxx>
                            </Row>


                        </>
                }
                <br />

            </AppLayout>
        )
    }

}

export default DEFFDashboard;

