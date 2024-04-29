import React from "react";
// import Menubar from "./components/Menubar";
import { Outlet } from "react-router-dom";
import Menubar from "./Menubar";

const Sharecomp = () => {
  return (
    <div>
      <Menubar />
      <Outlet />
    </div>
  );
};

export default Sharecomp;
