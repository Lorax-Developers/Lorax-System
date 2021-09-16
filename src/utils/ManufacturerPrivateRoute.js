import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ManufacturerPrivateRoute = ({
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
        <Redirect to="/manufacturer" />
      ) : user.role == "DEFF" ? (
        <Redirect to="/deff-dashboard" />
      ) : user.role == "admin" ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/insights" />
      )
    }
  />
);

ManufacturerPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManufacturerPrivateRoute);
