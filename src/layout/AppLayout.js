import React, { Component } from "react";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={`menu-sub-hidden rounded sub-hidden ${containerClassnames}`}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
          {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default AppLayout;
