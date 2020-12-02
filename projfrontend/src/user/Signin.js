import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //On Submitting the form.
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              email: "",
              error: "",
              password: "",
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //Perform Redirect
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/user/profile" />;
    }
    //If didRedirect Fails, then go default to home.
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  //LOADING Message
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading......!</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="container">
        <div
          className="bg-dark text-center"
          style={{ padding: "20px", maxWidth: "400px", margin: "10px auto" }}
        >
          <h1>Instagram</h1>
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
            onChange={handleChange("password")}
            value={password}
            style={{ margin: "10px 0", width: "100%", height: "40px" }}
          />
          <button className="btn btn-success btn-block" onClick={onSubmit}>
            Sign In
          </button>
          <h6>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "100",
              }}
            >
              Don't have an account ? Create an account
            </Link>
          </h6>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      <p>{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
};

export default Signin;
