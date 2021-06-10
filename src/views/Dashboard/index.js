import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import RecyclingLineGraph from "./components/RecyclingLineGraph";
import SortableStaticticsRow from './components/SortableStaticticsRow';
import SmartbinPieChart from './components/SmartbinPieChart';
import DashboardBarChart from "./components/DashboardBarChart";

const Dashboard = () => {
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>LORAX Dashboard</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            
            <SortableStaticticsRow/>

            <Row>
                <Colxx sm="12" md="6" className="mb-4">
                    <RecyclingLineGraph/>
                </Colxx>
                <Colxx sm="4" md="6" className="mb-4">
                    <SmartbinPieChart chartClass="dashboard-donut-chart" />
                </Colxx>
            </Row>
           
            <Row>
                <Colxx sm="12" md="12">
                     <DashboardBarChart />
                </Colxx>
            </Row>
            <br />
            <br />
        </AppLayout>
    )
}

export default Dashboard;