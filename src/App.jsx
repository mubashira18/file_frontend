// Import necessary dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sharecomp from "./Components/Sharecomp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import FileTrack from "./FileTrack";
import Protect from "./Protect";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sharecomp />}>
          <Route index element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard/*"
          element={
            <Protect>
              <FileTrack />
            </Protect>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
