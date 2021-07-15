import React from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

const Admin = () => {
  return(
      <AppLayout>
          <Row>
            <Colxx xxs="12">
              <h1>LORAX Administration Statistics</h1>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <FeaturedInfo/>
          <Chart data={userData} title="Active User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
        <WidgetSm/> <WidgetLg/>
        
      </div>
      </AppLayout>
  )
}

export default Admin;