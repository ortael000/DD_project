import React from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../components/header.js";

export function Layout () {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };
  