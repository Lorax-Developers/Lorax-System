import React from "react";
import AppLayout from "../../layout/AppLayout";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
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
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get("http://localhost:5000/api/admin")
      .then((results) => this.setState({ items: results.data }));
  }

  render() {
    var { items } = this.state;

    return (
      <AppLayout>
        <Row>
          <Colxx xxs="12">
            <h1>LORAX Administration Statistics</h1>
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
                <th>Role</th>
                <th>Grant Access</th>
              </thead>
              <tbody>
                {items.map(function (item, index) {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td>
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
      </AppLayout>
    );
  }
}

export default Admin;
