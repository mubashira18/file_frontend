import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StopMonitoringButton from "./StopMonitoringButton"; // Button to stop monitoring
import "./index.css";
import LogoutButton from "./LogoutButton";
const FileTrack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [path, setPath] = useState("");
  const [interval, setInterval] = useState(5);
  const [filesToTrack, setFilesToTrack] = useState("");
  const [fileEvents, setFileEvents] = useState([]);
  const [monitoring, setMonitoring] = useState(false); // Track monitoring status

  const handleFileTrackChange = (event) => {
    setFilesToTrack(event.target.value);
  };

  const submitAndStartMonitoring = async () => {
    if (!name || !email || !path || !filesToTrack) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setMonitoring(true);

    try {
      const configResponse = await axios.post("http://localhost:3000/config", {
        name,
        email,
        path,
        interval,
        files_to_track: filesToTrack.split(",").map((f) => f.trim()),
      });

      if (configResponse.status === 201) {
        toast.success("Configuration submitted successfully!");

        const startResponse = await axios.post("http://localhost:3000/start", {
          email,
        });

        if (startResponse.status === 200) {
          toast.success("Monitoring started successfully!");
        } else {
          throw new Error("Failed to start monitoring.");
        }
      } else {
        throw new Error("Configuration submission failed.");
      }
    } catch (error) {
      setMonitoring(false);

      if (error.response) {
        // If error response exists
        if (error.response.status === 400) {
          // Display error message from backend
          toast.error(error.response.data.error);
        } else {
          // Generic error message
          toast.error(`Error: ${error.response.data.error}`);
        }
      } else {
        // Unexpected error
        toast.error(`Unexpected error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    // Reset state to default values when component is loaded
    setName("");
    setEmail("");
    setPath("");
    setInterval(5);
    setFilesToTrack("");
    setMonitoring(false);

    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setFileEvents((prevEvents) => [...prevEvents, data]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      socket.close(); // Cleanup WebSocket when component unmounts
    };
  }, []); // Ensure the WebSocket is set up on component mount

  return (
    <div className="min-h-screen flex flex-col sm:flex-row p-6 bg-gray-200">
      <div className="sm:w-1/2 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {" "}
          {/* Neumorphic style */}
          <h2 className="text-xl font-bold text-gray-800">
            File Monitor Configuration
          </h2>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Path to Monitor"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Interval (seconds)"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value, 10))}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Files to Track (comma-separated)"
              value={filesToTrack}
              onChange={handleFileTrackChange}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-between mt-4">
              {" "}
              {/* Start and Stop buttons */}
              <button
                onClick={submitAndStartMonitoring}
                className={`bg-indigo-600 text-white p-3 rounded-lg shadow-inner hover:bg-indigo-700 transition-colors duration-300`}
                disabled={monitoring} // Disable when monitoring
              >
                {monitoring ? "Monitoring..." : "Start Monitoring"}
              </button>
              {/* Stop Monitoring Button */}
              <StopMonitoringButton setMonitoring={setMonitoring} />{" "}
              {/* Separate button to stop monitoring */}
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-1/2 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">File Events</h2>
          <ul className="mt-4 space-y-2">
            {fileEvents.map((event, index) => (
              <li key={index} className="p-2 rounded-lg bg-white shadow-inner">
                {event.eventType} on {event.filePath}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileTrack;
