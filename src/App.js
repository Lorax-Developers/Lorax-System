import React, { Component, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { getDirection } from "./helpers/Utils";

//APP PAGES
import Dashboard from "./views/Dashboard";
import Scan from "./views/Scan";
import Admin from "./views/Admin";
import Manufacturer from "./views/Manufacturer";
import Login from "./views/Login";
import UserProfile from "./views/UserProfile";
import Faq from "./views/FAQ";
import Landing from "./views/Landing";
import Insights from "./views/Insights";
import DEFFDashboard from "./views/DEFF-Dashboard";
import Bottles from "./views/Bottles";
import Pro_request from "./views/Manufacturer/pro_request";
//redux
import PrivateRoute from "./utils/privateRoute";
import AdminPrivateRoute from "./utils/adminPrivateRoute";
import PROPrivateRoute from "./utils/proPrivateRoute";
import InsightsPrivateRoute from "./utils/InsightsPrivateRoute";
import DEFFPrivateRoute from "./utils/DEFFPrivateRoute";
import ManufacturerPrivateRoute from "./utils/ManufacturerPrivateRoute";
import UserProfilePrivateRoute from "./utils/UserProfilePrivateRoute";
import ScanPrivateRoute from "./utils/ScanPrivateRoute";
import BottleHistoryPrivateRoute from "./utils/BottleHistoryPrivateRoute";

import Alert from "./layout/Alert";

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render = () => {
    const currentAppLocale = AppLocale["en"];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Alert />
                <Switch>
                  <Route path="/login" component={Login} />
                  <ManufacturerPrivateRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <ScanPrivateRoute exact path="/scan" component={Scan} />
                  <BottleHistoryPrivateRoute
                    exact
                    path="/bottles"
                    component={Bottles}
                  />
                  <Route
                    path="/error"
                    exact
                    render={() => <h1>Error page</h1>}
                  />
                  <Route path="/" exact component={Landing} />
                  <AdminPrivateRoute exact path="/admin" component={Admin} />
                  <PROPrivateRoute
                    exact
                    path="/manufacturer"
                    component={Manufacturer}
                  />
                  <PROPrivateRoute
                    exact
                    path="/pro_request"
                    component={Pro_request}
                  />
                  <UserProfilePrivateRoute
                    exact
                    path="/userprofile"
                    component={UserProfile}
                  />
                  <PrivateRoute exact path="/faq" component={Faq} />
                  <InsightsPrivateRoute
                    exact
                    path="/insights"
                    component={Insights}
                  />
                  <DEFFPrivateRoute
                    exact
                    path="/deff-dashboard"
                    component={DEFFDashboard}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  };
}

export default App;
