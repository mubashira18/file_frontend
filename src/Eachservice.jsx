import React from "react";
import services from "./servicesData";
import { Link, useParams } from "react-router-dom";
import "./Eachservices.css"; // Import CSS file for styling

const Eachservice = () => {
  const { userId } = useParams();
  const data = services.find((each) => each.id === parseInt(userId));

  // Check if data is found
  if (!data) {
    return <div>No service found for ID: {userId}</div>;
  }

  return (
    <div className="each-service-container">
      c
      <img src={data.image} alt={data.title} className="service-image" />
      <div className="descriptioncontainer">
        <h1 className="service-title">{data.title}</h1>
        <p className="service-description">{data.description}</p>
        <p className="service-brief-description">{data.briefDescription}</p>
        <Link className="text-red-600" style={{ fontSize: 30 }} to="/services">
          Back to services
        </Link>
      </div>
    </div>
  );
};

export default Eachservice;
