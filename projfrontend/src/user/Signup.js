import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in SignUp"));
  };

  //SUCCESS Message
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-center"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created Successfully
            <br />
            <Link to="/signin"> Log In to Your Account</Link>
          </div>
        </div>
      </div>
    );
  };

  //ERROR Message
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div
        className="bg-dark text-center"
        style={{ padding: "20px", maxWidth: "400px", margin: "10px auto" }}
      >
        <h1>Instagram</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleChange("name")}
          style={{ margin: "10px 0", width: "100%", height: "40px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange("email")}
          style={{ margin: "10px 0", width: "100%", height: "40px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange("password")}
          style={{ margin: "10px 0", width: "100%", height: "40px" }}
        />
        <button className="btn btn-success btn-block" onClick={onSubmit}>
          Sign Up
        </button>
        <h6>
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "100",
            }}
          >
            Already have an account ? Sign In
          </Link>
        </h6>
      </div>
    );
  };

  return (
    <Base>
      <div className="container">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
      </div>
    </Base>
  );
};

export default Signup;
