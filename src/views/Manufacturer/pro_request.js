/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { Redirect } from "react-router-dom";
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
import Swal from "sweetalert2";
const axios = require("axios");

const Pro_request = (props) => {
  const [dropDownData, setDropDownData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [manufacturerData, setManufacturerData] = useState({});

  const getManufacturers = () => {
    let server = "http://localhost:5000";
    var config = {
      method: "get",
      url: `${server}/api/User/manufacturerlist`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        let options = response.data.map((d) => ({
          value: d._id,
          label: d.name,
        }));
        setDropDownData(options);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getManufacturers();

  //Set selectedUser variable when when a manufacturer is selected from the drop down list
  function onChangeInput({ value }) {
    setSelectedUser(value);
  }
  useEffect(() => {
    let server = "http://localhost:5000";
    //Get Manufacturer Data for drop down list
    let getManufacturerDetails = () => {
      var config = {
        method: "get",
        url: `${server}/api/user/userdetails/${selectedUser}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        //Successful?
        .then(function (response) {
          setManufacturerData(response.data);
        })
        //Unsuccessful?
        .catch(function (error) {
          console.log(error);
        });
    };
    if (selectedUser !== null) {
      getManufacturerDetails();
    }
    console.log(manufacturerData);
  }, [selectedUser]);

  function onSubmit() {
    if (props.auth.user.hasOwnProperty("pro")) {
      Swal.fire({
        title: "Please remove current manufacturer",
        text: "You need to remove current manufacturer to request a new one",
        icon: "failure",
        confirmButtonColor: "#ff0000",
        confirmButtonText: "Alright!",
      }).then(function () {
        window.location = "http://localhost:3000/manufacturer";
      });
    } else {
      axios.post(
        "http://localhost:5000/api/pro/request/" +
          props.auth.user._id +
          "/" +
          manufacturerData.myId +
          "/" +
          manufacturerData.myName
      );
      window.location = "http://localhost:3000/manufacturer";
    }
  }

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
            <div id="request_manufacturer">
              <label for="manufacturer">Manufacturer</label>
              <Select
                options={dropDownData}
                placeholder={"Select a user"}
                onChange={onChangeInput}
              ></Select>
              <br />

              <label for="email" className="pro-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="pro_fields"
                value={manufacturerData.myEmail}
              ></input>
              <br />

              <label for="number" className="pro-label">
                Contact Number
              </label>
              <input
                type="text"
                name="number"
                className="pro_fields"
                value={manufacturerData.myPhone}
              ></input>

              <br />

              <label for="city" className="pro-label">
                City
              </label>
              <input
                type="text"
                name="city"
                className="pro_fields"
                value={manufacturerData.myCity}
              ></input>
              <br />

              <button
                className="btn btn-primary"
                value="Submit Request"
                onClick={onSubmit}
              >
                Submit request
              </button>
            </div>
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
