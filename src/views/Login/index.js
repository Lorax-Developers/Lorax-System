import React, { Fragment, useState } from "react";
import axios from "axios";
import "./loginstyle.css";

//Allows transition (SignIn/SignUp)
const signIn = function () {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const container = document.querySelector(".container");
  container.classList.remove("sign-up-mode");
};

const signUp = function () {
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  container.classList.add("sign-up-mode");
};

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const { name, email, role, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      role,
      password,
    };
    try {
      //access headers make sure its json
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      //change body to JSON format
      const body = JSON.stringify(newUser);
      console.log(body);
      const res = await axios.post("/api/users", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <body>
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form action="#" className="sign-in-form">
                <h1 className="heading">LORAX</h1>
                <h2 className="title">Login to access account</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" />
                </div>
                <input type="submit" defvalue="Login" className="btn solid" />
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </form>

              <form onSubmit={(e) => onSubmit(e)} className="sign-up-form">
                <h1 className="heading">LORAX</h1>
                <h2 className="title">Sign up to access account</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => onChange(e)}
                    required
                    name="name"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => onChange(e)}
                    required
                    name="email"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="enum"
                    placeholder="Role"
                    onChange={(e) => onChange(e)}
                    required
                    name="role"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
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
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
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
              <img src={require("./img/log.svg")} className="image" alt="" />
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
              <img src="./img/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

export default Login;
