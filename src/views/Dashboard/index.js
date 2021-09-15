import React, { useEffect, useState } from "react";
import AppLayout from '../../layout/AppLayout';
import {
  Row, Card, CardText, CardBody,
  CardTitle
} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./dashboard.scss";

import SortableStaticticsRow from "./components/SortableStaticticsRow";
import SmartbinPieChart from "./components/SmartbinPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import TotalManufacturedCard from "./components/TotalManufacturedCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { LoraxLoader } from "../../components/LoraxLoader";


const Dashboard = () => {
  //variable, variable updating function, default value
  const [dataNumbers, setDataNumbers] = useState({});
  const [dataNumbersBarChart, setDataNumbersBarChart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get manufacturer details
  let manufacturer = useSelector(state => state.auth.user._id);
  let name = useSelector(state => state.auth.user.name);
  let city = useSelector(state => state.auth.user.city);
  let province = useSelector(state => state.auth.user.province);
  let today = new Date().toLocaleDateString()

  //runs when page loads
  useEffect(() => {
    let server = "http://localhost:5000";

    //Further data for the bar chart
    const getFurtherData = () => {
      let thisMonth = new Date().getMonth() - 4;
      let statusOne = "Manufactured";
      let statusTwo = "Recycled";

      var config = {
        method: "get",
        url: `${server}/api/totalbottlesmonthly?startMonth=${thisMonth}&statusOne=${statusOne}&statusTwo=${statusTwo}&manufacturerId=${manufacturer}`,
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
      url: `${server}/api/totalbottles?manufacturerId=${manufacturer}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
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
  }, []);

  //   return (
  //     <AppLayout>
  //       <Row>
  //         <Colxx xxs="12">
  //           <h1>LORAX Dashboard</h1>
  //           <Separator className="mb-5" />
  //         </Colxx>
  //       </Row>
  //       {isLoading ? (
  //         "Please wait..."
  //       ) : (
  //         <>
  //           <TotalManufacturedCard
  //             dataNumbers={dataNumbers}
  //           ></TotalManufacturedCard>
  //           <SortableStaticticsRow dataNumbers={dataNumbers} />
  //           <Row>
  //             <Colxx sm="12" md="6" className="mb-4">
  //               {/*Bar Chart*/}
  //               <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
  //             </Colxx>
  //             <Colxx sm="12" md="6" className="mb-4">
  //               {/*Polar Chart*/}
  //               <SmartbinPieChart
  //                 dataNumbers={dataNumbers}
  //                 chartClass="dashboard-donut-chart"
  //               />
  //             </Colxx>
  //           </Row>
  //         </>
  //       )}
  //       <br />
  //       <br />
  //     </AppLayout>
  //   );
  // };

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>LORAX Dashboard</h1>
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
                <div>

                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">{name}</CardTitle>
                      <CardText tag="h6" className="mb-2 text-muted">{city}</CardText>
                      <CardText tag="h6" className="mb-2 text-muted">{province}</CardText>
                      <CardText tag="h6" className="mb-2 text-muted">Date: {today}</CardText>
                    </CardBody>
                  </Card>
                </div>
              </Colxx>
              <Colxx xl="6" lg="6" md="6" className="mb-4">
                <TotalManufacturedCard dataNumbers={dataNumbers} ></TotalManufacturedCard>
              </Colxx>
            </Row>

            <SortableStaticticsRow dataNumbers={dataNumbers} />
            <Row>
              <Colxx sm="12" md="6" className="mb-4">
                {/*Bar Chart*/}
                <DashboardBarChart dataNumbersBarChart={dataNumbersBarChart} />
              </Colxx>
              <Colxx sm="12" md="6" className="mb-4">

                {/*Polar Chart*/}
                <SmartbinPieChart dataNumbers={dataNumbers} chartClass="dashboard-donut-chart" />
              </Colxx>
            </Row>
          </>
        )
      }
      <br />
      <br />
    </AppLayout>
  )
}

export default Dashboard;
