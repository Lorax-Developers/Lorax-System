import React, { useEffect, useState } from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss"

import SortableStaticticsRow from './components/SortableStaticticsRow';
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import TotalManufacturedCard from "./components/TotalManufacturedCard"
import ManufacturerDetailsCard from "./components/ManufacturerDetailsCard";
import ReactSelectExample from "./components/ReactSelectExample";
import axios from "axios";
import { useSelector } from "react-redux";
import data from "../../constants/menu";
import Select from "react-select";


const DEFFDashboard = () => {

    //variable, variable updating function, default value
    const [dataNumbers, setDataNumbers] = useState({});
    const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //let manufacturer = "61148f31a63d3550d4350e46";
    let manufacturer = "";

    //runs when page loads
    useEffect(() => {
        let server = 'http://localhost:5000';

        //Further data for the bar chart
        const getFurtherData = () => {
            let thisMonth = new Date().getMonth() - 4;
            let statusOne = "Manufactured";
            let statusTwo = "Recycled";

            var config = {
                method: 'get',
                url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}&manufacturerId=${manufacturer}`,
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
                    setIsLoading(false);
                });
        }
        //?manufacturerId=${manufacturer}
        var config = {

            method: 'get',
            url: `${server}/api/totalbottles?manufacturerId=${manufacturer}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(config)
            //Successful?
            .then(function (response) {
                setDataNumbers(response.data);
                getFurtherData();
            })
            //Unsuccessful?
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });

    }, [])

    return (
        <AppLayout>
            <Row>
                <Colxx xxs="12">
                    <h1>DEFF Dashboard</h1>
                    <Separator className="mb-5" />
                    <ReactSelectExample></ReactSelectExample>
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx>

                </Colxx>
            </Row>
            {
                isLoading ?

                    "Please wait..."
                    :
                    <>
                        <Row>
                            <Colxx xl="6" lg="6" md="6" className="mb-4">
                                <ManufacturerDetailsCard> </ManufacturerDetailsCard>
                            </Colxx>
                            <Colxx xl="6" lg="6" md="6" className="mb-4">
                                <TotalManufacturedCard dataNumbers={dataNumbers} ></TotalManufacturedCard>
                            </Colxx>
                        </Row>

                        <SortableStaticticsRow dataNumbers={dataNumbers} />
                        <Row>
                            <Colxx sm="12" md="6" className="mb-4">

                                {/*Polar Chart*/}
                                <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart" />
                            </Colxx>
                        </Row>
                    </>
            }
            <br />
            <br />
        </AppLayout>
    )
}

export default DEFFDashboard;

// Recycled vs Manufactured Bar Chart 
// <Colxx sm="12" md="6" className="mb-4">
// {/*Bar Chart*/}
// <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
// </Colxx>