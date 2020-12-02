import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import CreatePost from "./core/CreatePost";
import Home from "./core/Home";
import Profile from "./user/Profile";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoutes path="/user/profile" exact component={Profile} />
        <PrivateRoutes path="/user/createpost" exact component={CreatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
