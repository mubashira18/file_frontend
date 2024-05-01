import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./Home.css";

const Home = () => {
  const notify = () => {
    alert("Please login to access.");
    toast.success("Stay booked successfully!");
  };

  return (
    <>
      <ToastContainer />
      <div className="hero-section">
        <h1>
          <span>Sri</span> <span>Venkateswara</span> <span>Engineering</span>{" "}
          <span>College</span>
        </h1>
        <p className="homingwelcome">
          Welcome to SVU file tracking system, keep moniter here.
        </p>
        <Link to="/login" className="pt-4">
          <button className="book-button " onClick={notify}>
            Track Here
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
