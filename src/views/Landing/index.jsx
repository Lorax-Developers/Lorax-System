import React, { useState } from "react";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/css/landingstyle.css";
import { Reorder } from "@material-ui/icons";

const NewLanding = (props) => {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div>
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <a href="/landing">
              <img
                src={require("../../assets/img/logo-black.png")}
                className="img-fluid"
              />
            </a>
          </div>
          <div>
            <div className="Navbar">
              <div className="leftSide">
                <div className="links" id={showLinks ? "hidden" : ""}>
                  <a href="#solution">The Solution</a>
                  <a href="#benefits">The Benefits</a>
                  <a href="#technology">The Technology</a>
                  <a href="#getstarted" className="getstarted">
                    Get Started
                  </a>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}>
                  {""} <Reorder />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* hero section */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Welcome to Lorax </h1>
              <h2>
                Powered by blockchain to facilitate a cleaner environment{" "}
              </h2>
              <div>
                <a href="#about" className="btn-get-started scrollto">
                  Get Started
                </a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img">
              <img
                src={require("./assets/img/example-scene-2.svg")}
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* solution */}
      <section id="main">
        <section id="solution" className="about">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 d-flex align-items-center justify-content-center about-img">
                <img
                  src={require("./assets/img/example-scene-2.svg")}
                  className="img-fluid animated"
                  alt=""
                />
              </div>
              <div className="col-lg-6 pt-5 pt-lg-0">
                <h3>The Solution</h3>
                <p>
                  Lorax is a plastic waste lifecycle management system that uses
                  blockchain to track bottles throughout their lifecycle from
                  manufacturing through to recycling.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <i className="bx bx-receipt"></i>
                    <h4>Accurate Reporting</h4>
                    <p>
                      Interactive dashboards can be used by Producer
                      Responsibility Organisations (PRO) and the Department of
                      the Environment, Forestry and Fisheries (DEFF) to observe
                      the state of production and recycling of plastic products
                      in South Africa.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <i className="bx bx-cube-alt"></i>
                    <h4>Real-Time Tracking</h4>
                    <p>
                      Plastic bottle manufacturers can view the real-time status
                      of their products throughout the product life cycle, from
                      manufacturing through to supply, consumption, recycling
                      and re-use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* benefits section */}
      <section id="main">
        <section id="benefits" className="benefits section-bg">
          <div className="container">
            <div className="section-title">
              <h3>The Benefits</h3>
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bxl-dribbble"></i>
                  </div>
                  <h4 className="title">Immutable and trusted data</h4>
                  <p className="description">
                    The immutable aspect of Blockchain ensures that data cannot
                    not been tampered with, resulting in accurate and
                    trustworthy reporting.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-file"></i>
                  </div>
                  <h4 className="title">Recycling Incentives</h4>
                  <p className="description">
                    Waste-pickers and the general public are rewarded with
                    redeemable Lorax tokens for every bottle that they deposit.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-tachometer"></i>
                  </div>
                  <h4 className="title">Increased transparency </h4>
                  <p className="description">
                    Blockchain enables more transparent and accurate end-to-end
                    tracking in the product lifecycle.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-world"></i>
                  </div>
                  <h4 className="title">Increased accountability </h4>
                  <p className="description">
                    Manufacturers can be held physically and financially
                    responsible for their products post consumption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* // about section */}

      <section id="technology" className="about">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6 pt-5 pt-lg-0">
              <h3>The Technology</h3>
              <p>
                Lorax provides users with a simple, easy-to-use interface,
                helping users achieve their goals efficiently. However, in the
                background, Lorax makes use of complex, powerful technology.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <i className="bx bx-receipt"></i>
                  <h4>Blockchain</h4>
                  <p>
                    A shared, immutable ledger that facilitates the process of
                    recording transactions and tracking tangible or intangible
                    assets. The transactions stored on the network are
                    immutable, meaning no participant can change or tamper with
                    a transaction after it’s been recorded. This technology
                    provides great transparency and will allow the government
                    and PROs to see the production and recycling levels of
                    specific manufacturers in South Africa.
                  </p>
                </div>
                <div className="col-md-6">
                  <i className="bx bx-cube-alt"></i>
                  <h4>QR Codes</h4>
                  <p>
                    Each bottle has a Quick Response (QR) code that store URLs
                    that will interact with the Lorax website and in turn
                    interact with the Ethereum Blockchain. Users can scan the
                    code with a smartphone or scanner to up update each plastic
                    bottle’s position and status on the blockchain. Scanning
                    will take place at the bottle production plant, retailers
                    and recycling drop-off points. These unique codes ensure
                    that bottles cannot be scanned for recycling more than once,
                    thereby preventing dishonest activities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-flex align-items-center justify-content-center about-img">
              <img
                src={require("./assets/img/example-scene-2.svg")}
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="section-bg">
        <div className="container py-4">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Lorax 2021 </span>
            </strong>
          </div>
          <div className="credits">Designed by Team 8</div>
        </div>
      </footer>
    </div>
  );
};
export default NewLanding;
