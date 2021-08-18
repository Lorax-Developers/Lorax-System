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

  state = {
    currentPage: "",
  };
  componentDidMount = () => {
    const currentPage = window.location.pathname;
    this.setState({
      currentPage: currentPage,
    });
  };
  render({ auth: { user } }) {
    return (
      <div className="sidebar">
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
                        /*style={{
                          visibility:
                            user.role == "admin" && item.id == "admin"
                              ? "visible"
                              : "hidden",
                        }}
                        style={{
                          visibility:
                            user.role == "PRO" && item.id == "manufacturer"
                              ? "visible"
                              : "hidden",
                        }}*/
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
