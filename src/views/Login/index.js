import React, { Fragment, useState } from "react";
import axios from "axios";
import "./loginstyle.scss";

//Allows transition (SignIn/SignUp)
const signIn = function () {
  //const sign_in_btn = document.querySelector("#sign-in-btn");
  const container = document.querySelector(".container");
  container.classList.remove("sign-up-mode");
};

const signUp = function () {
  //const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  container.classList.add("sign-up-mode");
};

const Login = () => {
  //REGISTER HOOK
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    province: "",
    city: "",
    password: "",
    access: "n/a",
  });
  //LOGIN HOOK
  const [L_formData, L_setFormData] = useState({
    L_email: "",
    L_password: "",
  });
  //REGISTER FUNCTIONALITY
  const { name, email, role, province, city, password, access } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      role,
      province,
      city,
      password,
      access,
    };
    //check if manufacturer and apply pending access
    if ((newUser.role = "Manufacturer" || "manufacturer")) {
      newUser.access = "Pending";
      console.log(newUser);
      try {
        //access headers make sure its json
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        //change body to JSON format
        const body = JSON.stringify(newUser);
        console.log(body);
        const res = await axios.post(
          "http://localhost:5000/api/user",
          body,
          config
        );
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
      //LOGIN FUNCTIONALITY

      const { L_email, L_password } = formData;

      const onChange = (f) =>
        setFormData({ ...formData, [f.target.name]: f.target.value });

      const onSubmit = async (f) => {
        f.preventDefault();
      };
    }
  };

  return (
    <Fragment>
      <body className="login-container">
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form
                action="#"
                onSubmit={(f) => onSubmit(f)}
                className="sign-in-form"
              >
                <h1 className="heading">LORAX</h1>
                <h2 className="title">Login to access account</h2>
                <div className="input-field">
                  <i className="simple-icon-user"></i>
                  <input
                    type="text"
                    placeholder="Email"
                    name="L_email"
                    onChange={(f) => onChange(f)}
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="L_name"
                    onChange={(f) => onChange(f)}
                  />
                </div>
                <input type="submit" defvalue="Login" className="btn solid" />
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  <a href="https://facebook.com" className="social-icon">
                    <i className="simple-icon-social-facebook"></i>
                  </a>
                  <a href="https://twitter.com" className="social-icon">
                    <i className="simple-icon-social-twitter"></i>
                  </a>
                  <a href="https://google.com" className="social-icon">
                    <i className="simple-icon-social-google"></i>
                  </a>
                  <a href="https://linkedin.com" className="social-icon">
                    <i className="simple-icon-social-linkedin"></i>
                  </a>
                </div>
              </form>

              <form onSubmit={(e) => onSubmit(e)} className="sign-up-form">
                <h1 className="heading">LORAX</h1>
                <h2 className="title">Sign up to access account</h2>
                <div className="input-field">
                  <i className="simple-icon-user"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => onChange(e)}
                    required
                    name="name"
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => onChange(e)}
                    required
                    name="email"
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-user"></i>
                  <input
                    type="text"
                    placeholder="Province"
                    onChange={(e) => onChange(e)}
                    required
                    name="province"
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-user"></i>
                  <input
                    type="text"
                    placeholder="City"
                    onChange={(e) => onChange(e)}
                    required
                    name="city"
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-user"></i>
                  <input
                    type="enum"
                    placeholder="Role"
                    onChange={(e) => onChange(e)}
                    required
                    name="role"
                  />
                </div>
                <div className="input-field">
                  <i className="simple-icon-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => onChange(e)}
                    required
                    name="password"
                  />
                </div>
                <input type="submit" className="btn" value="Sign up" />
                <p className="social-text">Or Sign up with social platforms</p>
                <div className="social-media">
                  <a href="https://facebook.com" className="social-icon">
                    <i className="simple-icon-social-facebook"></i>
                  </a>
                  <a href="https://twitter.com" className="social-icon">
                    <i className="simple-icon-social-twitter"></i>
                  </a>
                  <a href="https://google.com" className="social-icon">
                    <i className="simple-icon-social-google"></i>
                  </a>
                  <a href="https://linkedin.com" className="social-icon">
                    <i className="simple-icon-social-linkedin"></i>
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  Kindly click on the sign up icon below and fill in the
                  necessary details to access the LORAX System.
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={signUp}
                >
                  Sign up
                </button>
              </div>
              <img
                src={require("./img/log.svg").default}
                className="image"
                alt=""
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  Kindly click on the Login icon below to access the LORAX
                  system.
                </p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={signIn}
                >
                  Login
                </button>
              </div>
              <img
                src={require("./img/register.svg").default}
                className="image"
                alt=""
              />
            </div>
          </div>
        </div>
      </body>
    </Fragment>
  );
};
export default Login;
