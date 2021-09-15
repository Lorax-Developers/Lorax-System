import React, { useEffect, useState } from "react";
import AppLayout from '../../layout/AppLayout';
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { Row, Card, CardText, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import TotalDepositedCard from './components/TotalDepositedCard'
import TotalDepositedChart from './components/TotalDepositedChart'
import TotalRecycledChart from './components/TotalRecycledChart'
import TotalRecycledCard from './components/TotalRecycledCard'
import LoraxTokensCard from './components/LoraxTokensCard'


const Insights = () => {
    const [dataNumbers, setDataNumbers] = useState({});
    const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Get User Details 
    let user = useSelector(state => state.auth.user._id);
    let name = useSelector(state => state.auth.user.name);
    let city = useSelector(state => state.auth.user.city);
    let province = useSelector(state => state.auth.user.province);
    let today = new Date().toLocaleDateString()
    let loraxRole = useSelector(state => state.auth.user.role);


    // //runs when page loads
    useEffect(() => {
        let server = 'http://localhost:5000';

        ///////////////// WastePicker or Consumer ////////////////// 
        if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {

            //Further data about the deposited bar graph 

            const getFurtherData = () => {
                let thisMonth = new Date().getMonth() - 4;

                var config = {
                    method: 'get',
                    url: `${server}/api/totalbottlesmonthlydeposited?startMonth=${thisMonth}&wastepickerId=${user}`,
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

            // deposited total card 
            var config = {
                method: 'get',
                url: `${server}/api/totalbottlesdeposited?wastepickerId=${user}`,
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
        }

        /////////////////// RECYCLING DEPOT ////////////////// 
        else if (loraxRole === "Recycling Depot") {

            //Further data about the deposited bar graph 

            const getFurtherData = () => {
                let thisMonth = new Date().getMonth() - 4;

                var config = {
                    method: 'get',
                    url: `${server}/api/totalbottlesmonthlyrecycled?startMonth=${thisMonth}&recyclingDepotId=${user}`,
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
            // deposited total card 
            var config = {
                method: 'get',
                url: `${server}/api/totalbottlesrecycled?recyclingDepotId=${user}`,
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
        }

    }, [])

    if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {
        return (
            <AppLayout>
                <Row>
                    <Colxx xl="4" lg="4" md="12" className="mb-4">
                        <div>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{name}</CardTitle>
                                    <CardText tag="h6" className="mb-2 text-muted">{loraxRole}</CardText>
                                    <CardText tag="h6" className="mb-2 text-muted">{city + ", " + province}</CardText>
                                    <CardText tag="h6" className="mb-2 text-muted">Date: {today}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Colxx>
                    <Colxx xl="4" lg="4" md="12" className="mb-4">
                        {/* Card 1: Total Number of Bottles Recycled by waste picker / consumer  */}
                        <TotalDepositedCard dataNumbers={dataNumbers}></TotalDepositedCard>
                    </Colxx>
                    <Colxx xl="4" lg="4" md="12" className="mb-4">
                        <LoraxTokensCard dataNumbers={dataNumbers}></LoraxTokensCard>
                    </Colxx>
                </Row>
                {/* Graph 1: Number of bottles recycled per month by waste picker / consumer  */}
                <TotalDepositedChart dataNumbersBarChart={dataNumbersBarChart}></TotalDepositedChart>
            </AppLayout>
        )
    }
    else if (loraxRole === "Recycling Depot") {

        return (
            <AppLayout>
                <Row>
                    <Colxx xl="6" lg="6" md="6" className="mb-4">
                        <div>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{name}</CardTitle>
                                    <CardText tag="h6" className="mb-2 text-muted">{loraxRole}</CardText>
                                    <CardText tag="h6" className="mb-2 text-muted">{city + ", " + province}</CardText>
                                    <CardText tag="h6" className="mb-2 text-muted">Date: {today}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Colxx>
                    <Colxx xl="6" lg="6" md="6" className="mb-4">
                        {/* Card 2: Number of bottles recycled  */}
                        <TotalRecycledCard dataNumbers={dataNumbers}></TotalRecycledCard>
                    </Colxx>
                </Row>
                {/* Graph 2: Number of bottles recyceld per month by  */}
                <TotalRecycledChart dataNumbersBarChart={dataNumbersBarChart}></TotalRecycledChart>
            </AppLayout>

        )
    }
}

export default Insights;