import Swal from "sweetalert2";

import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProdashboardPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? null : isAuthenticated &&
        user.role === "PRO" &&
        user.hasOwnProperty("pro") ? (
        user.pro.status === "Granted" ? (
          <Component {...props} />
        ) : user.pro.status === "Requested" ? (
          Swal.fire({
            title: "Please await authorisation to a manufacturer",
            text: "You need to have authorisation of a manufacturer to access their data",
            icon: "failure",
            confirmButtonColor: "#ff0000",
            confirmButtonText: "Alright!",
          }).then(function () {
            window.location = "http://localhost:3000/manufacturer";
          })
        ) : (
          Swal.fire({
            title: "Please select a manufacturer",
            text: "You need to request a manufacturer to access their data",
            icon: "failure",
            confirmButtonColor: "#ff0000",
            confirmButtonText: "Alright!",
          }).then(function () {
            window.location = "http://localhost:3000/manufacturer";
          })
        )
      ) : (
        Swal.fire({
          title: "Please select a manufacturer",
          text: "You need to request a manufacturer to access their data",
          icon: "failure",
          confirmButtonColor: "#ff0000",
          confirmButtonText: "Alright!",
        }).then(function () {
          window.location = "http://localhost:3000/manufacturer";
        })
      )
    }
  />
);

ProdashboardPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProdashboardPrivateRoute);
