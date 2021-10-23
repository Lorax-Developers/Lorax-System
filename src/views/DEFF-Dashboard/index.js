import React, { useEffect, useState, } from "react";
import AppLayout from '../../layout/AppLayout';
import { Row, Button, } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss"
import { LoraxLoader } from "../../components/LoraxLoader";

import SortableStaticticsRow from './components/SortableStaticticsRow';
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import TotalManufacturedCard from "./components/TotalManufacturedCard"
import ManufacturerDetailsCard from "./components/ManufacturerDetailsCard";
import TotalManufacturedCardSA from "./components/TotalManufacturedCardSA";
import TotalRecycledCardSA from "./components/TotalRecycledCardSA";

import UserTable from "./components/UsersTable";
import axios from "axios";
import Select from "react-select";

function DEFFDashboard(props) {

    //variable, variable updating function, default value
    const [dropDownData, setDropDownData] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [manufacturerData, setManufacturerData] = useState({});
    const [dataNumbers, setDataNumbers] = useState({});
    const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
    const [usersTableData, setUsersTableData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [madeChoice, setmadeChoice] = useState(true);

    const [selectedYear, setSelectedYear] = useState(2021);
    const yearsData = [{ value: 2021, label: 2021 }, { value: 2020, label: 2020 }, { value: 2019, label: 2019 }];


    let server = 'http://localhost:5000';

    // Get Years for drop down   
    function onChangeDate({ value }) {
        setSelectedYear(value);
        setIsLoading(true);
    }

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

    //Set selectedUser variable when when a manufacturer is selected from the drop down list
    function onChangeInput({ value }) {
        setSelectedUser(value);
        setmadeChoice(false);
        setIsLoading(true);
    };

    //Runs when page loads

    useEffect(() => {
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

            //Further Data for Manufactured Vs Recycled Bar Chart 
            let getMonthlyData = () => {
                let thisMonth = new Date().getMonth() - 4;
                let statusOne = "Manufactured";
                let statusTwo = "Recycled";

                var config = {
                    method: 'get',
                    url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}&manufacturerId=${selectedUser}&year=${selectedYear}`,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                axios(config)
                    .then(function (response) {
                        setDataNumbersBarChart(response.data.data)
                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            getMonthlyData();
            getUsersData();
        }

    }, [selectedUser, isLoading, madeChoice, selectedYear, setSelectedYear])
    // If South Africa is selected from the list, display these components 
    if (selectedUser === "1234") {
        return (
            <AppLayout>
                <Row>
                    <Colxx xl="8" lg="8" md="12">
                        <h1>Department of Environment, Forestry and Fisheries Dashboard</h1>
                    </Colxx>
                    <Colxx xl="4" lg="4" md="12">
                        <div className="text-zero top-right-button-container">
                            <Button target="_blank" href="https://ropsten.etherscan.io/address/0xccd9716739b8430aea337714056fbcd220e582f0"
                                color="primary"
                                size="lg"
                                className="top-right-button">
                                Explore Blockchain
                            </Button>
                            {"  "}
                        </div>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xl="6" lg="6" md="12">
                        <Select options={dropDownData} placeholder={"Please select an option"} onChange={onChangeInput}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>

                    <Colxx xl="6" lg="6" md="12">
                        <Select options={yearsData} placeholder={"2021"} onChange={onChangeDate}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {
                    isLoading ? (
                        <LoraxLoader />
                    ) : (
                        <>
                            <Row>
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <TotalManufacturedCardSA dataNumbers={dataNumbers}></TotalManufacturedCardSA>
                                </Colxx>
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <TotalRecycledCardSA dataNumbers={dataNumbers} ></TotalRecycledCardSA>
                                </Colxx>
                            </Row>
                            <Row>
                                <Colxx sm="12" md="12" className="mb-4">
                                    <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
                                </Colxx>
                            </Row>

                            <Colxx xxs="12" className="mb-4">
                                <br></br>
                                <h1>Supply Chain Analysis</h1>
                                <Separator className="mb-5" />
                            </Colxx>
                            <SortableStaticticsRow dataNumbers={dataNumbers}></SortableStaticticsRow>
                            <Colxx sm="12" md="12" className="mb-4">
                                <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart"> </SmartbinPieChart>
                            </Colxx>

                            <Row>
                                <Colxx xxs="12">
                                    <br></br>
                                    <h1>Lorax Users Analysis</h1>
                                    <Separator className="mb-5" />
                                </Colxx>
                                <Colxx sm="12" md="12" className="mb-4">
                                    <UserTable usersTableData={usersTableData}></UserTable>
                                </Colxx>
                            </Row>
                            <br />
                        </>
                    )
                }

            </AppLayout >
        )
    }
    // If a specific manufacturer is selected from the list, display these components on the dashboard
    else {
        return (
            <AppLayout>
                <Row>
                    <Colxx xl="8" lg="8" md="12">
                        <h1>Department of Environment, Forestry and Fisheries Dashboard</h1>
                    </Colxx>
                    <Colxx xl="4" lg="4" md="12">
                        <div className="text-zero top-right-button-container">
                            <Button target="_blank" href="https://ropsten.etherscan.io/address/0xccd9716739b8430aea337714056fbcd220e582f0"
                                color="primary"
                                size="lg"
                                className="top-right-button">
                                Explore Blockchain
                            </Button>
                            {"  "}
                        </div>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx>
                        <Select options={dropDownData} placeholder={"Please select an option"} onChange={onChangeInput}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>
                    <Colxx xl="6" lg="6" md="12">
                        <Select options={yearsData} placeholder={"2021"} onChange={onChangeDate}>
                        </Select>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {
                    isLoading ? (
                        <LoraxLoader />
                    ) : (
                        <>
                            <Row>
                                <Separator className="mb-5" />
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <ManufacturerDetailsCard manufacturerData={manufacturerData}> </ManufacturerDetailsCard>
                                </Colxx>
                                <Colxx xl="6" lg="6" md="6" className="mb-4">
                                    <TotalManufacturedCard dataNumbers={dataNumbers} ></TotalManufacturedCard>
                                </Colxx>
                            </Row>
                            <Row>
                                <Colxx sm="12" md="12" className="mb-4">
                                    <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
                                </Colxx>
                            </Row>

                            <Colxx xxs="12" className="mb-4">
                                <br></br>
                                <h1>Supply Chain Analysis</h1>
                                <Separator className="mb-5" />
                            </Colxx>
                            <SortableStaticticsRow dataNumbers={dataNumbers}></SortableStaticticsRow>
                            <Colxx sm="12" md="12" className="mb-4">
                                <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart"> </SmartbinPieChart>
                            </Colxx>
                        </>
                    )
                }
                <br />
            </AppLayout>
        )
    }
}
export default DEFFDashboard;

