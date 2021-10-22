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

const Insights = () => {
  const [dataNumbers, setDataNumbers] = useState({});
  const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
  const [provinceData, setProvinceData] = useState({});
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Get User Details
  let user = useSelector((state) => state.auth.user._id);
  let name = useSelector((state) => state.auth.user.name);
  let city = useSelector((state) => state.auth.user.city);
  let province = useSelector((state) => state.auth.user.province);
  let today = new Date().toLocaleDateString();
  let loraxRole = useSelector((state) => state.auth.user.role);

  // //runs when page loads
  useEffect(() => {
    let server = "http://localhost:5000";

    ///////////////// WastePicker or Consumer //////////////////
    if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {

      //Further data about the deposited bar graph
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Deposited";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyOneVariable?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}`,
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

      // deposited total card
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
            setIsLoading(false);
          })
          //Unsuccessful?
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

      //Further data about the recycled bar graph
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Recycled";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyOneVariable?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}`,
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

      // Recycled total card
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
            setIsLoading(false);
          })
          //Unsuccessful?
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

      //Further data about the retailer bar chart
      const getGraphData = () => {
        let thisMonth = new Date().getMonth() - 4;
        let statusOne = "Delivered";
        let statusTwo = "Purchased";
        var config = {
          method: "get",
          url: `${server}/api/bottlehistory/monthlyTwoVariables?startMonth=${thisMonth}&userID=${user}&statusOne=${statusOne}&statusTwo=${statusTwo}`,
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

      // Total purchased Card 
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
            setIsLoading(false);
          })
          //Unsuccessful?
          .catch(function (error) {
            console.log(error);
            setIsLoading(false);
          });
      };

      // // Total in stock Card 
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
            setIsLoading(false);
          })
          //Unsuccessful?
          .catch(function (error) {
            console.log(error);
            setIsLoading(false);
          });
      };

      getGraphData();
      getPurchasedCardData();
      getStockCardData();
      console.log(dataNumbers);
    }

  }, []);

  if (loraxRole === "Waste Picker" || loraxRole === "Consumer") {
    return isLoading ? (
      <LoraxLoader />
    ) : (
      <AppLayout>
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
            {/* Card 1: Total Number of Bottles Recycled by waste picker / consumer  */}
            <TotalDepositedCard dataNumbers={dataNumbers}></TotalDepositedCard>
          </Colxx>
          <Colxx xl="4" lg="4" md="12" className="mb-4">
            <LoraxTokensCard dataNumbers={dataNumbers}></LoraxTokensCard>
          </Colxx>
        </Row>
        {/* Graph 1: Number of bottles recycled per month by waste picker / consumer  */}
        <TotalDepositedChart
          dataNumbersBarChart={dataNumbersBarChart}
        ></TotalDepositedChart>
      </AppLayout>
    );
  } else if (loraxRole === "Recycling Depot") {
    return isLoading ? (
      <LoraxLoader />
    ) : (
      <AppLayout>
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
            {/* Card 2: Number of bottles recycled  */}
            <TotalRecycledCard dataNumbers={dataNumbers}></TotalRecycledCard>
          </Colxx>
        </Row>
        {/* Graph 2: Number of bottles recycled per month by  */}
        <TotalRecycledChart
          dataNumbersBarChart={dataNumbersBarChart}
        ></TotalRecycledChart>
      </AppLayout>
    );
  }
  else if (loraxRole === "Retailer") {
    return isLoading ? (
      <LoraxLoader />
    ) : (
      <AppLayout>
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

        {/* Graph 2: Number of bottles Sold vs Purchased per month by  */}
        <RetailerBarChart
          dataNumbersBarChart={dataNumbersBarChart}
        ></RetailerBarChart>
      </AppLayout>
    );
  }
};

export default Insights;
