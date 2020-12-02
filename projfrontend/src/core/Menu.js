import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
// import { isAuthenticated, signout } from "../auth/helper";

const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

//Use history as a props
const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={activeTab(history, "/")} className="nav-link" to="/">
            Instagram
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={activeTab(history, "/user/profile")}
              className="nav-link"
              to="/user/profile"
            >
              Profile
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={activeTab(history, "/user/createpost")}
              className="nav-link"
              to="/user/createpost"
            >
              Create Post
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  return history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
