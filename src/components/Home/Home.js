import React from "react";
import { Outlet } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

import "./Home.css";
import Navbar from "../Navbar/Navbar";

function Home() {
  const pageState = useSelector((state) => state.pageState);
  return (
    <div className="homeContainer">
      {pageState.loading && (
        <LinearProgress color="inherit" className="homeLoader" />
      )}
      <div className="homeNavbarContainer">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
