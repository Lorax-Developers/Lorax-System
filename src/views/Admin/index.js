import React from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import "./admin.css";
const axios = require("axios");

//Previous structural elements
/*
<FeaturedInfo/>
          <Chart data={userData} title="Active User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
        <WidgetSm/> <WidgetLg/>
        


      </div>
*/

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      pro_items: [],
    };
  }

  componentDidMount() {
    this.getRequests();
  }

  getRequests() {
    axios
      .get("http://localhost:5000/api/admin")
      .then((results) => this.setState({ items: results.data }));
    axios
      .get("http://localhost:5000/api/admin/pro")
      .then((results) => this.setState({ pro_items: results.data }));
  }

  render() {
    var { items } = this.state;
    var { pro_items } = this.state;
    return (
      <AppLayout>
        <Row>
          <Colxx xxs="12">
            <h1>LORAX Admin Page</h1>
            <h2>User access requests</h2>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <div className="Auth-Table">
          <form className="">
            <table className="admin-table admin-container">
              <thead className="admin-table-thead">
                <th className="admin-tableHeader">ID</th>
                <th className="admin-tableHeader">Name</th>
                <th className="admin-tableHeader">Email</th>
                <th className="admin-tableHeader">Contact Number</th>
                <th className="admin-tableHeader">Role</th>
                <th className="admin-tableHeader">Grant Access</th>
              </thead>
              <tbody>
                {items.map(function (item, index) {
                  return (
                    <tr className="admin-tableRow" key={index}>
                      <td className="admin-tableData">{item._id}</td>
                      <td className="admin-tableData">{item.name}</td>
                      <td className="admin-tableData">{item.email}</td>
                      <td className="admin-tableData">{item.phone}</td>
                      <td className="admin-tableData">{item.role}</td>
                      <td className="admin-tableData">
                        <button
                          className=" update"
                          onClick={function () {
                            axios.put(
                              "http://localhost:5000/api/admin/update/" +
                                item._id
                            );
                          }}
                        >
                          <i className="simple-icon-check"></i>
                        </button>
                        <button
                          className=" delete"
                          onClick={function () {
                            axios.delete(
                              "http://localhost:5000/api/admin/remove/" +
                                item._id
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

        <Row>
          <Colxx xxs="12">
            <h2 className="SubHeader">PRO Manufacturer requests</h2>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <div className="PRO-Table">
          <form className="">
            <table className="admin-table admin-container">
              <thead className="admin-table-thead">
                <th className="admin-tableHeader">PRO ID</th>
                <th className="admin-tableHeader">Name</th>
                <th className="admin-tableHeader">Email</th>
                <th className="admin-tableHeader">Contact Number</th>
                <th className="admin-tableHeader">Manufacturer</th>
                <th className="admin-tableHeader">Manufacturer ID</th>
                <th className="admin-tableHeader">Grant Access</th>
              </thead>
              <tbody>
                {pro_items.map(function (pro_item, index) {
                  return (
                    <tr className="admin-tableRow" key={index}>
                      <td className="admin-tableData">{pro_item._id}</td>
                      <td className="admin-tableData">{pro_item.name}</td>
                      <td className="admin-tableData">{pro_item.email}</td>
                      <td className="admin-tableData">{pro_item.phone}</td>
                      <td className="admin-tableData">{pro_item.pro.name}</td>
                      <td className="admin-tableData">{pro_item.pro.id}</td>
                      <td className="admin-tableData">
                        <button
                          className=" update"
                          onClick={function () {
                            axios.put(
                              "http://localhost:5000/api/admin/pro/update/" +
                                pro_item._id
                            );
                          }}
                        >
                          <i className="simple-icon-check"></i>
                        </button>
                        <button
                          className=" delete"
                          onClick={function () {
                            axios.delete(
                              "http://localhost:5000/api/pro/remove/" +
                                pro_item._id +
                                "/" +
                                pro_item.pro.id
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
  }
}

export default Admin;
