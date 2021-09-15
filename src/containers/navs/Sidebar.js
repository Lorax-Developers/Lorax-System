import React, { Component } from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import IntlMessages from "../../helpers/IntlMessages";

import menuItems from "../../constants/menu";
//REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Sidebar extends Component {
  propTypes = {
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "",
      auth: this.auth,
    };
  }

  componentDidMount = () => {
    const currentPage = window.location.pathname;
    this.setState({
      currentPage: currentPage,
    });
  };
  render() {
    return (
      <div className="sidebar" render={Sidebar.auth}>
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  menuItems.map((item) => {
                    return (
                      <NavItem
                        key={item.id}
                        className={`${
                          item.to === this.state.currentPage && "active"
                        }`}
                        style={{
                          display:
                            this.props.user.role == "admin"
                              ? item.id == "admin"
                                ? "block"
                                : item.id == "scanproduct"
                                ? "none"
                                : item.id == "dashboard"
                                ? "none"
                                : item.id == "faq"
                                ? "none"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "none"
                                : "block"
                              : this.props.user.role == "Manufacturer"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "block"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "block"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "Retailer"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "block"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "block"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "Consumer"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "block"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "block"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "Waste Picker"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "block"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "block"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "Recycling Depot"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "block"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "block"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "PRO"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "none"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "none"
                                : item.id == "manufacturer"
                                ? "block"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : this.props.user.role == "DEFF"
                              ? item.id == "admin"
                                ? "none"
                                : item.id == "scanproduct"
                                ? "none"
                                : item.id == "dashboard"
                                ? "block"
                                : item.id == "faq"
                                ? "none"
                                : item.id == "manufacturer"
                                ? "none"
                                : item.id == "userprofile"
                                ? "block"
                                : "block"
                              : "block",

                          /*item.id == "admin"
                              ? this.props.user.role !== "admin"
                                ? "none"
                                : "block"
                              : item.id == "manufacturer"
                              ? this.props.user.role !== "PRO" ||
                                this.props.user.role !== "admin"
                                ? "none"
                                : "block"
                              : item.id == "scanproduct"
                              ? this.props.user.role !== "PRO" ||
                                this.props.user.role !== "admin"
                                ? "none"
                                : this.props.user.role == "Manufacturer"
                                ? "none"
                                : "block"
                              : item.id == "userprofile"
                              ? this.props.user.role !== "admin"
                                ? "block"
                                : "none"
                              : item.id == "faq"
                              ? this.props.user.role !== "admin"
                                ? "block"
                                : "none"
                              : "block",*/
                        }}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} />{" "}
                            <IntlMessages id={item.label} />
                          </a>
                        ) : (
                          <NavLink to={item.to} data-flag={item.id}>
                            <i className={item.icon} />{" "}
                            <IntlMessages id={item.label} />
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
