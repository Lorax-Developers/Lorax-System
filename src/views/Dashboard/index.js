import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss";

import SortableStaticticsRow from "./components/SortableStaticticsRow";
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import axios from "axios";

//REDUX
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = () => {
  const [dataNumbers, setDataNumbers] = useState({});
  const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let server = "http://localhost:5000";
    const getFurtherData = () => {
      let thisMonth = new Date().getMonth() - 1;
      let statusOne = "Manufactured";
      let statusTwo = "Recycled";

      var config = {
        method: "get",
        url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          setDataNumbersBarChart(response.data.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    };

    var config = {
      method: "get",
      url: `${server}/api/totalbottles`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setDataNumbers(response.data);
        getFurtherData();
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>LORAX Dashboard</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {isLoading ? (
        "Please wait..."
      ) : (
        <>
          <SortableStaticticsRow dataNumbers={dataNumbers} />
          <Row>
            <Colxx sm="12" md="6" className="mb-4">
              {/*Bar Chart*/}
              <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
            </Colxx>
            <Colxx sm="4" md="6" className="mb-4">
              {/*Polar Chart*/}
              <SmartbinPieChart
                dataNumbers={dataNumbers}
                chartClass="dashboard-donut-chart"
              />
            </Colxx>
          </Row>
        </>
      )}
      <br />
      <br />
    </AppLayout>
  );
};

export default Dashboard;
