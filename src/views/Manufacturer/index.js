/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import Manufacturer_Profiling from "../../components/Manufacturer_Profiling/Manufacturer_Profiling";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
const axios = require("axios");

const Manufacturer = ({ auth: { user } }) => {
  var items = Array();

  const componentDidMount = () => {
    let myDetails = GetUserDetailsByID(user.id);
    console.log(myDetails);
  };

  function GetUserDetailsByID(id) {
    axios
      .get("http://localhost:5000/api/pro/manufacturers" + id)
      .then((results) => this.setState({ items: results.data }));
  }

  function GetManufacturerDetailsByID(id) {
    axios
      .get("http://localhost:5000/api/pro/manufacturers" + id)
      .then((results) => this.setState({ items: results.data }));
  }

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>Manufacturer's Profile</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="">
        <form className="">
          <table className="admin-table admin-container">
            <thead className="admin-table-thead">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Remove</th>
            </thead>
            <tbody>
              {items.map(function (item, index) {
                return (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button
                        className=" delete"
                        onClick={function () {
                          axios.delete(
                            "http://localhost:5000/api/pro/remove/" + item._id
                          );
                        }}
                      >
                        <i className="simple-icon-close"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </AppLayout>
  );
};

Manufacturer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Manufacturer);

/* Initial return()
  ---------------------
  <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Manufacturer's Profile</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Manufacturer_Profiling/>
        </AppLayout>
  ---------------------
  */
