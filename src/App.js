import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
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
import Landing from "./views/Landing"

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

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

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
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/scan" component={Scan} />
                  <Route path="/userprofile" component={UserProfile} />

                  <Route
                    path="/error"
                    exact
                    render={() => <h1>Error page</h1>}
                  />
                  <Route
                    path="/"
                    exact
                    component = {Landing}
                  />
                   <Route
                    path="/admin"
                    component = {Admin}
                  />
                   <Route
                    path="/manufacturer"
                    component = {Manufacturer}
                  />
                   <Route
                    path="/user-profile"
                    component = {UserProfile}
                  />
                  <Route
                    path="/faq"
                    component = {Faq}
                  />               
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
