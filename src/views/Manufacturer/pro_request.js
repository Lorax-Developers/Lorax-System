/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { loadUser } from "../../actions/auth";
import Manufacturer_Profiling from "../../components/Manufacturer_Profiling/Manufacturer_Profiling";
import "./pro-styles.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
const axios = require("axios");

const Pro_request = (props) => {
  const [dropDownData, setDropDownData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>PRO Request</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <div className="form-group ">
          <h2 className="form-header">New request</h2>
          <p className="form-instruction">
            Select a manufacturer from the dropdown list and ensure the details
            are correct before requesting below
          </p>
          <div className="request-table">
            <form method="POST" id="request_manufacturer" href="./">
              <label for="manufacturer">Manufacturer</label>
              <input type="select" name="manufacturer"></input>
              <br />

              <label for="email">Email</label>
              <input type="text" name="email" className="pro_fields"></input>
              <br />

              <label for="number">Contact Number</label>
              <input type="text" name="number" className="pro_fields"></input>
              <br />

              <label for="city">City</label>
              <input type="text" name="city" className="pro_fields"></input>
              <br />

              <input
                type="submit"
                name="submit"
                className="btn btn-primary"
                value="Submit Request"
              />
            </form>
          </div>
        </div>
      </Row>
    </AppLayout>
  );
};

Pro_request.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Pro_request);

/*
 <tbody>
              {items.map(function (items, index) {
                return (
                  <tr key={index}>
                    <td>{items._id}</td>
                    <td>{items.name}</td>
                    <td>{items.email}</td>
                    <td>{items.phone}</td>
                    <td>
                      <button
                        className=" delete"
                        onClick={function () {
                          axios.delete(
                            "http://localhost:5000/api/pro/remove/" +
                              items._id +
                              "/" +
                              items.pro.id
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
              
*/
