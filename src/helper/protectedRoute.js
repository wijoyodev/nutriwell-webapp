import React from "react";
import { Route, redirect } from "react-router-dom";

export const ProtectedRouteBeforeLogin = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("access_token")) {
          return <Component {...props} />;
        } else {
          return redirect(`/${localStorage.getItem('username')}`)
        }
      }}
    />
  );
};

export const ProtectedRouteAfterLogin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("access_token")) {
          return <Component {...props} />;
        } else {
          return redirect(`/login`)
        }
      }}
    />
  );
};
