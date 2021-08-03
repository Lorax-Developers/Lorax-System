/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest manufacturers to join</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Manufacturing Company</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Location</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://th.bing.com/th/id/R.81374a6949b5a9b382552d81ea3a8bc8?rik=F1kEQzRRgpcKdw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-FJPLSHI4cVY%2fT0Kt3koo-gI%2fAAAAAAABLRU%2fyelxxfmKiSY%2fs1600%2fCoca_Cola_Logo1.jpg&ehk=ztM2h%2fYakZbOukd2goJvGjWqDRkBTCHFdINDwIW%2fzLQ%3d&risl=&pid=ImgRaw"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Cocacola</span>
          </td>
          <td className="widgetLgDate">13 July 2021</td>
          <td className="widgetLgAmount">12 Second Street, Cape Town South Africa</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://seeklogo.com/images/Z/ziploc-bags-logo-33FA8F1E1D-seeklogo.com.png"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Ziploc</span>
          </td>
          <td className="widgetLgDate">21 June 2021</td>
          <td className="widgetLgAmount">18 Riverside street Johannesburg South Africa</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://cdn.shopify.com/s/files/1/0063/4322/9529/files/pioneer_plastic_blue_718x225.png?v=1551645446"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Pioneer Plastics</span>
          </td>
          <td className="widgetLgDate">14 August 2021</td>
          <td className="widgetLgAmount">03 Adams Rd Mpumalanga South Africa</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://th.bing.com/th/id/OIP.NXRCsaefo5IQIgoMtVKFAQHaEK?pid=ImgDet&rs=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Pepsi</span>
          </td>
          <td className="widgetLgDate">02 July 2021</td>
          <td className="widgetLgAmount">21 Rein Street Port Elizabeth South Africa</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
