import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BottleHistoryPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? null : isAuthenticated && user.role == "Manufacturer" ? (
        <Component {...props} />
      ) : user.role == "PRO" ? (
        <Component {...props} />
      ) : user.role == "DEFF" ? (
        <Redirect to="/deff-dashboard" />
      ) : user.role == "admin" ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/scan" />
      )
    }
  />
);

BottleHistoryPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(BottleHistoryPrivateRoute);
