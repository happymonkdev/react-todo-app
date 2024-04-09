import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigator = useNavigate();

  function handleRegistrationForm(e) {
    e.preventDefault();
    const register = { name, userName, email, password };
    console.log(register);
    registerAPICall(register)
      .then((res) => {
        console.log(res);
        navigator("./login");
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
              <h2 className="text-center">User Registration form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label ">Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label ">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      value={userName}
                      placeholder="User Name"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label ">Email</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label ">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  type="button"
                  className="btn btn-primary "
                  onClick={(e) => handleRegistrationForm(e)}
                >
                  Submit
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
