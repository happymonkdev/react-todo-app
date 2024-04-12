import React, { useState } from "react";
import {
  getLoggedInUser,
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigate();
  async function doLogin(e) {
    e.preventDefault();
    console.log(e);
    const credentials = [userNameOrEmail, password];
    await loginAPICall(userNameOrEmail, password)
      .then((res) => {
        console.log(res.data);
        // const token = "Basic " + window.btoa(userNameOrEmail + ":" + password);
        const token = "Bearer " + res.data.accessToken;
        console.log("token is  ", token);
        storeToken(token);
        saveLoggedInUser(userNameOrEmail);
        console.log("--->", getLoggedInUser());
        navigator("/todos");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <br></br>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="form-label col-md-3">
                    Username / Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username or Email"
                      value={userNameOrEmail}
                      onChange={(e) => setUserNameOrEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="form-label col-md-3">Password : </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={(e) => doLogin(e)}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
