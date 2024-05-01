import React from "react";
import services from "./servicesData";
import "./Services.css";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="Servicewhole">
      <div className="servicewrapper">
        <h1 className="text-3xl" style={{ borderBottom: "1px solid white" }}>
          SERVICES
        </h1>
        <div className="servicescontainer">
          {services.map((each, index) => (
            <Link key={index} className="totalLink" to={`/services/${each.id}`}>
              <div className="eachservice">
                <img src={each.image} />
                <div className="matter">
                  <h4>
                    <span className="text-xl text-red-500">Title:</span>
                    <span className="text-xl">{each.title}</span>
                  </h4>
                  <h5>
                    <span className="text-2xl text-red-500">Description:</span>
                    <span className="text-xl">{each.description}</span>
                  </h5>
                  <div className="btndiv p-3">
                    <button className="btnview ">VIEW MORE</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
