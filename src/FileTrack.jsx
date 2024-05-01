import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StopMonitoringButton from "./StopMonitoringButton";
import LogoutButton from "./LogoutButton"; // Assuming a LogoutButton component exists
import "./index.css";
const FileTrack = () => {
  // Define state variables for the component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [path, setPath] = useState("");
  const [interval, setInterval] = useState(5);
  const [filesToTrack, setFilesToTrack] = useState("");
  const [fileEvents, setFileEvents] = useState([]);
  const [monitoring, setMonitoring] = useState(false); // To track monitoring status

  // Function to reset all fields and clear file events
  const resetFields = () => {
    setName("");
    setEmail("");
    setPath("");
    setInterval(5); // Default interval
    setFilesToTrack("");
    setFileEvents([]); // Clear all file events
  };

  // Function to submit the configuration and start monitoring
  const submitAndStartMonitoring = async () => {
    if (!name || !email || !path || !filesToTrack) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setMonitoring(true); // Indicate that monitoring is active

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
      setMonitoring(false); // Reset monitoring status if error occurs
      if (error.response) {
        toast.error(error.response.data.error); // Backend error message
      } else {
        toast.error("Unexpected error: " + error.message); // Generic error
      }
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse WebSocket data
        setFileEvents((prevEvents) => [...prevEvents, data]); // Add new events
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      socket.close(); // Clean up WebSocket connection on component unmount
    };
  }, []); // WebSocket setup on component mount

  return (
    <div className="min-h-screen flex flex-col sm:flex-row p-6 bg-gray-200">
      <div className="sm:w-1/2 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">
            File Monitor Configuration
          </h2>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner"
            />
            <input
              type="text"
              placeholder="Path to Monitor"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 border-none rounded-lg bg-white shadow-inner"
            />
            <input
              type="number"
              placeholder="Interval (seconds)"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value, 10))}
              className="w-full p-2 border-none rounded-lg"
            />
            <input
              type="text"
              placeholder="Files to Track (comma-separated)"
              value={filesToTrack}
              onChange={(e) => setFilesToTrack(e.target.value)}
              className="w-full p-2 border-none rounded-lg"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={submitAndStartMonitoring}
                className={`bg-indigo-600 text-white p-3 rounded-lg`}
                disabled={monitoring}
              >
                {monitoring ? "Monitoring..." : "Start Monitoring"}
              </button>
              {/* Pass resetFields to StopMonitoringButton */}
              <StopMonitoringButton
                setMonitoring={setMonitoring}
                resetFields={resetFields}
              />
              <LogoutButton /> {/* If LogoutButton exists */}
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
      <ToastContainer /> {/* Required for toast notifications */}
    </div>
  );
};

export default FileTrack;
