/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members of LORAX</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.81374a6949b5a9b382552d81ea3a8bc8?rik=F1kEQzRRgpcKdw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-FJPLSHI4cVY%2fT0Kt3koo-gI%2fAAAAAAABLRU%2fyelxxfmKiSY%2fs1600%2fCoca_Cola_Logo1.jpg&ehk=ztM2h%2fYakZbOukd2goJvGjWqDRkBTCHFdINDwIW%2fzLQ%3d&risl=&pid=ImgRaw"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Cocacola</span>
            <span className="widgetSmUserTitle">Manufacturing Company</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/OIP.NXRCsaefo5IQIgoMtVKFAQHaEK?pid=ImgDet&rs=1"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Pepsi</span>
            <span className="widgetSmUserTitle">Manufacturing Company</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.4e00e88e90b7aef57865b4a83a494432?rik=gVEnHVpM1hSMTw&riu=http%3a%2f%2fwww.ultimateplastics.co.za%2fskin%2fimages%2fultimate_logo.png&ehk=70fDNM1wZT2h6ApeIDiVbWVvUipr4wB4F28ipAp21FY%3d&risl=&pid=ImgRaw"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Ultimate Plastics</span>
            <span className="widgetSmUserTitle">Manufacturing Company</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://www.randplastics.co.za/wp-content/uploads/2020/08/Logo-Final-Small.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Rand Plastics</span>
            <span className="widgetSmUserTitle">Manufacturing Company</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://www.pcplastics.co.za/wp-content/uploads/2017/10/pcplogo.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">PC Plastics</span>
            <span className="widgetSmUserTitle">Manufacturing Company</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
