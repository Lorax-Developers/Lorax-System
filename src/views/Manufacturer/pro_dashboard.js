import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row, Card, CardText, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss";

import SortableStaticticsRow from "./components/SortableStaticticsRow";
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import TotalManufacturedCard from "./components/TotalManufacturedCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { LoraxLoader } from "../../components/LoraxLoader";
import Select from "react-select";

const Dashboard = () => {
  //variable, variable updating function, default value
  const [dataNumbers, setDataNumbers] = useState({});
  const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get manufacturer details
  let manufacturer = useSelector((state) => state.auth.user.pro.id);
  let name = useSelector((state) => state.auth.user.pro.name);
  let today = new Date().toLocaleDateString();

  const [selectedYear, setSelectedYear] = useState(2021);
  const yearsData = [
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
  ];

  // Get Years for drop down
  function onChangeInput({ value }) {
    setSelectedYear(value);
    setIsLoading(true);
  }

  //runs when page loads
  useEffect(() => {
    let server = "http://localhost:5000";

    //Get further data for the supply chain cards
    const getCardData = () => {
      var config = {
        method: "get",
        url: `${server}/api/totalbottles?manufacturerId=${manufacturer}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        //Successful?
        .then(function (response) {
          setDataNumbers(response.data);
        })
        //Unsuccessful?
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    };

    //Get data for the bar chart
    const getFurtherData = () => {
      let thisMonth = new Date().getMonth() - 4;
      let statusOne = "Manufactured";
      let statusTwo = "Recycled";

      var config = {
        method: "get",
        url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}&manufacturerId=${manufacturer}&year=${selectedYear}`,
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

    getFurtherData();
    getCardData();
  }, [manufacturer, selectedYear, setSelectedYear]);

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>LORAX Dashboard</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Colxx>
        <Select
          options={yearsData}
          placeholder={"2021"}
          onChange={onChangeInput}
        ></Select>
        <Separator className="mb-5" />
      </Colxx>

      {isLoading ? (
        <LoraxLoader />
      ) : (
        <>
          <Row>
            <Colxx xl="6" lg="6" md="6" className="mb-4">
              <div>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardText tag="h6" className="mb-2 text-muted">
                      Date: {today}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </Colxx>
            <Colxx xl="6" lg="6" md="6" className="mb-4">
              <TotalManufacturedCard
                dataNumbers={dataNumbers}
              ></TotalManufacturedCard>
            </Colxx>
          </Row>

          <Row>
            <Colxx sm="12" md="12" lg="12" className="mb-4">
              {/*Bar Chart*/}
              <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
            </Colxx>
          </Row>

          <Colxx xxs="12" className="mb-4">
            <br></br>
            <h1>Supply Chain Analysis</h1>
            <Separator className="mb-5" />
          </Colxx>
          <SortableStaticticsRow dataNumbers={dataNumbers} />

          <Colxx sm="12" md="12" lg="12" className="mb-4">
            {/*Polar Chart*/}
            <SmartbinPieChart
              dataNumbers={dataNumbers}
              chartClass="dashboard-donut-chart"
            />
          </Colxx>
        </>
      )}
      <br />
      <br />
    </AppLayout>
  );
};
export default Dashboard;
