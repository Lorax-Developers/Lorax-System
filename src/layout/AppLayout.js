import React, { Component } from "react";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import { useSelector } from "react-redux";

const AppLayout = (props) => {
  let user = useSelector(state => state.auth.user);
  const { containerClassnames } = props;

  return(
      <div id="app-container" className={`menu-sub-hidden rounded sub-hidden ${containerClassnames}`}>
        <TopNav user={user} history={props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
          {props.children}
          </div>
        </main>
      </div>
    )
  }

export default AppLayout;
