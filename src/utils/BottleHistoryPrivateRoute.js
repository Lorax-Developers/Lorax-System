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
      loading ? null : isAuthenticated &&
        user.role !==
          ("Consumer" ||
            "Waste Picker" ||
            "Recycling Depot" ||
            "Retailer" ||
            "Admin") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
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
