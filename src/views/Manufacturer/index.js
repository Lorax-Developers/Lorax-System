/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./pro-styles.css";
import useState from "react-usestateref";
import TableBody from "./pro_table";
const axios = require("axios").default;

const Manufacturer = (props) => {
  const [user, setUser] = useState(props.auth.user);
  const [items, setItems, itemsRef] = useState({});

  useEffect(() => {
    if (user.hasOwnProperty("pro")) {
      axios
        .get("http://localhost:5000/api/pro/manufacturers/" + user.pro.id)
        .then((results) => {
          setItems(results.data);
        });
    }
  }, []);

  return (
    <AppLayout>
      <Row>
        <Colxx xxs="12">
          <h1>Manufacturer's Profile</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <TableBody user={user} items={items}></TableBody>
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

/*
 
              
*/
