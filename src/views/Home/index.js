import React from "react";
import { NavLink } from "react-router-dom";
import "./home.scss";


const Home = () => {
    return(
       <div className="home">
           <img alt="Lorax Logo" src={require("../../assets/img/logo-black.png").default} />
           <h1>LORAX Homepage</h1>
           <p>LORAX Homepage is still in the works!</p>
           <NavLink to="/dashboard">Visit Dashboard</NavLink>
       </div>
    )
}
export default Home;