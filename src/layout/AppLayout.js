import React, { Component, useState } from "react";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import { useSelector } from "react-redux";

const AppLayout = (props) => {
  let user = useSelector((state) => state.auth.user);
  const { containerClassnames } = props;
  const [showsidebar, togglesidebar] = useState(true)
  return (
    <div
      id="app-container"
      className={`menu-sub-hidden rounded sub-hidden ${showsidebar===true ? "": "main-hidden"} ${containerClassnames}`}
    >
      <TopNav user={user} history={props.history} togglesidebar={togglesidebar} showsidebar={showsidebar}/>
      <Sidebar user={user} history={props.history} />
      <main>
        <div className="container-fluid">{props.children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
