import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const proPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? null : isAuthenticated && user.role == "PRO" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

proPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(proPrivateRoute);
