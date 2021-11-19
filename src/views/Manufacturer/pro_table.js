import React from "react";

const axios = require("axios").default;

const TableBody = (props) => {
  const items = props.items;
  const user = props.user;

  var _id, name, email, phone;
  let status = false;
  function data() {
    var list = new Map(Object.entries(items));
    Object.entries(items).forEach(([key, value]) => {
      if (key === "_id") {
        _id = value;
      } else if (key === "name") {
        name = value;
      } else if (key === "email") {
        email = value;
      } else if (key === "phone") {
        phone = value;
      } else if (key === "pro") {
        let pro = value;
        status = pro.status;
      }
      if (status === false) {
        status = "Requested";
      }
    });
    if (user.pro) {
      return (
        <table className=" admin-container">
          <thead className="pro-table-thead">
            <tr>
              <th className="table-headings">ID</th>
              <th className="table-headings">Name</th>
              <th className="table-headings">Email</th>
              <th className="table-headings">Contact Number</th>
              <th className="table-headings">Status</th>
              <th className="table-headings">Remove Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pro-tableData">{_id}</td>
              <td className="pro-tableData">{name}</td>
              <td className="pro-tableData">{email}</td>
              <td className="pro-tableData">{phone}</td>
              <td className="pro-tableData">{user.pro.status}</td>
              <td className="pro-tableData">
                <button
                  className=" delete"
                  onClick={function () {
                    axios.delete(
                      "http://localhost:5000/api/pro/remove/" +
                        user._id +
                        "/" +
                        _id
                    );
                  }}
                >
                  <i className="simple-icon-close"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <p className="noProMessage">
          Please make a request to access and report on a manufacturer
        </p>
      );
    }
  }
  return (
    <div className="PRO-Table">
      <a href="/pro_request" className="requestbtn btn btn-primary">
        <i className="simple-icon-user "></i>
        <span className="requestText"> Make request </span>
      </a>
      <form className="form-group">{data()}</form>
    </div>
  );
};

export default TableBody;

/*

 {}

*/
