import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Row, Card, CardText, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import TotalDepositedCard from "./components/TotalDepositedCard";
import TotalDepositedChart from "./components/TotalDepositedChart";
import TotalRecycledChart from "./components/TotalRecycledChart";
import TotalRecycledCard from "./components/TotalRecycledCard";
import TotalPurchasedCard from "./components/TotalPurchasedCard";
import LoraxTokensCard from "./components/LoraxTokensCard";
import RetailerBarChart from "./components/RetailerBarChart";
import TotalInStock from "./components/TotalInStockCard";
import { LoraxLoader } from "../../components/LoraxLoader";
import { Separator } from "../../components/common/CustomBootstrap";
import Select from "react-select";

const Insights = () => {
  const [dataNumbers, setDataNumbers] = useState({});
  const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
  const [provinceData, setProvinceData] = useState({});
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2021);
  const yearsData = [{ value: 2021, label: 2021 }, { value: 2020, label: 2020 }, { value: 2019, label: 2019 }];


  // Get User Details
  let user = useSelector((state) => state.auth.user._id);
  let name = useSelector((state) => state.auth.user.name);
  let city = useSelector((state) => state.auth.user.city);
  let province = useSelector((state) => state.auth.user.province);
  let today = new Date().toLocaleDateString();
  let loraxRole = useSelector((state) => state.auth.user.role);


  //  Get selected drop down year
  function onChangeDate({ value }) {
    setSelectedYear(value);
    setIsLoading(true);
  }


  // //runs when page loads and when the selected year is changed 
  useEffect(() => {
    let server = "http://localhost:5000";

    ///////////////// WastePicker or Consumer //////////////////
    if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {

      // Get deposited card total
      const getDepositedCardData = () => {
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/deposited?userID=${user}`,
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

      //Get data about the deposited bar graph
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Deposited";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyOneVariable?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}&year=${selectedYear}`,
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
      getGraphData();
      getDepositedCardData();
    }

    /////////////////// RECYCLING DEPOT //////////////////
    else if (loraxRole === "Recycling Depot") {

      // Get data for the total recycled card
      const getRecycledCardData = () => {
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/recycled?userID=${user}`,
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
      //Get data about the recycled bar graph
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Recycled";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyOneVariable?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}&year=${selectedYear}`,
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
      getGraphData();
      getRecycledCardData();
    }

    /////////////////// RETAILER //////////////////

    else if (loraxRole === "Retailer") {

      // Get data for the total purchased Card 
      const getPurchasedCardData = () => {
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/purchased?userID=${user}`,
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
          });
      };

      // Get the number of bottles in stock 
      const getStockCardData = () => {
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/instock?userID=${user}`,
          headers: {
            "Content-Type": "application/json",
          },
        };
        axios(config)
          //Successful?
          .then(function (response) {
            setStockData(response.data);
          })
          //Unsuccessful?
          .catch(function (error) {
            console.log(error);
          });
      };

      // Get data about the retailer bar chart
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Delivered";
        let statusTwo = "Purchased";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyTwoVariables?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}&statusTwo=${statusTwo}&year=${selectedYear}`,
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

      getGraphData();
      getPurchasedCardData();
      getStockCardData();
    }
  }, [selectedYear, setSelectedYear]);

  // If the user is a Waste Picker or Consumer, display the following:
  if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {
    return (
      <AppLayout>
        <Row>
          <Colxx xxs="12">
            <h1>Recycling Data</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Colxx>
          <Select options={yearsData} placeholder={"2021"} onChange={onChangeDate}>
          </Select>
          <Separator className="mb-5" />
        </Colxx>
        {
          isLoading ? (
            <LoraxLoader />
          ) : (
            <>
              <Row>
                <Colxx xl="4" lg="4" md="12" className="mb-4">
                  <div>
                    <Card>
                      <CardBody>
                        <CardTitle tag="h5">{name}</CardTitle>
                        <CardText tag="h6" className="mb-2 text-muted">
                          {loraxRole}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          {city + ", " + province}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          Date: {today}
                        </CardText>
                      </CardBody>
                    </Card>
                  </div>
                </Colxx>
                <Colxx xl="4" lg="4" md="12" className="mb-4">
                  {/* Card: Total Number of Bottles Recycled by waste picker / consumer  */}
                  <TotalDepositedCard dataNumbers={dataNumbers}></TotalDepositedCard>
                </Colxx>
                <Colxx xl="4" lg="4" md="12" className="mb-4">
                  <LoraxTokensCard dataNumbers={dataNumbers}></LoraxTokensCard>
                </Colxx>
              </Row>
              {/* Graph: Number of bottles recycled per month by waste picker / consumer  */}
              <TotalDepositedChart
                dataNumbersBarChart={dataNumbersBarChart}
              ></TotalDepositedChart>
            </>
          )
        }
      </AppLayout>
    );
    // If the user is a Recycling Depot, display the following:
  } else if (loraxRole === "Recycling Depot") {
    return (
      <AppLayout>

        <Row>
          <Colxx xxs="12">
            <h1>Recycling Data</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Colxx>
          <Select options={yearsData} placeholder={"2021"} onChange={onChangeDate}>
          </Select>
          <Separator className="mb-5" />
        </Colxx>
        {
          isLoading ? (
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
                          {loraxRole}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          {city + ", " + province}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          Date: {today}
                        </CardText>
                      </CardBody>
                    </Card>
                  </div>
                </Colxx>
                <Colxx xl="6" lg="6" md="6" className="mb-4">
                  {/* Card: Number of bottles recycled  */}
                  <TotalRecycledCard dataNumbers={dataNumbers}></TotalRecycledCard>
                </Colxx>
              </Row>
              {/* Graph: Number of bottles recycled per month*/}
              <TotalRecycledChart
                dataNumbersBarChart={dataNumbersBarChart}
              ></TotalRecycledChart>
            </>
          )
        }
      </AppLayout>
    );
  }
  // If the user is a Retailer, display the following:
  else if (loraxRole === "Retailer") {
    return (
      <AppLayout>
        <Row>
          <Colxx xxs="12">
            <h1>Retailer Analysis</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Colxx>
          <Select options={yearsData} placeholder={"2021"} onChange={onChangeDate}>
          </Select>
          <Separator className="mb-5" />
        </Colxx>
        {
          isLoading ? (
            <LoraxLoader />
          ) : (
            <>
              <Row>
                <Colxx xl="4" lg="12" md="12" className="mb-4">
                  <div>
                    <Card>
                      <CardBody>
                        <CardTitle tag="h5">{name}</CardTitle>
                        <CardText tag="h6" className="mb-2 text-muted">
                          {loraxRole}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          {city + ", " + province}
                        </CardText>
                        <CardText tag="h6" className="mb-2 text-muted">
                          Date: {today}
                        </CardText>
                      </CardBody>
                    </Card>
                  </div>
                </Colxx>
                <Colxx xl="4" lg="6" md="6" className="mb-4">
                  {/* Card: Number of bottles Purchased */}
                  <TotalPurchasedCard dataNumbers={dataNumbers}></TotalPurchasedCard>
                </Colxx>
                <Colxx xl="4" lg="6" md="6" className="mb-4">
                  {/* Card: Number of bottles in stock */}
                  <TotalInStock stockData={stockData} ></TotalInStock>
                </Colxx>
              </Row>

              {/* Graph: Number of bottles Sold vs Purchased per month*/}
              <RetailerBarChart
                dataNumbersBarChart={dataNumbersBarChart}
              ></RetailerBarChart>
            </>
          )
        }
      </AppLayout>
    );
  }
};

export default Insights;
