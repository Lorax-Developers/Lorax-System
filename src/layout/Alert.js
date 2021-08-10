import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>;
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//maps state to a state prop then passed to alerts which is added to Alert as a prop for access
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
