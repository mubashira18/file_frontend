import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState(""); // To store the name
  const [email, setEmail] = useState(""); // To store the email
  const [path, setPath] = useState(""); // Path to monitor
  const [interval, setInterval] = useState(5); // Monitoring interval
  const [filesToTrack, setFilesToTrack] = useState(""); // Files to track
  const [fileEvents, setFileEvents] = useState([]); // Store real-time file events

  // Function to handle input changes for files to track
  const handleFileTrackChange = (event) => {
    setFilesToTrack(event.target.value);
  };

  // Function to submit configuration and start monitoring
  const submitAndStartMonitoring = async () => {
    try {
      // Submit configuration
      const configResponse = await axios.post("http://localhost:3000/config", {
        name,
        email,
        path,
        interval,
        files_to_track: filesToTrack.split(",").map((file) => file.trim()),
      });

      if (configResponse.status === 201) {
        alert("Configuration submitted successfully");

        // Start monitoring
        const startResponse = await axios.post("http://localhost:3000/start");
        if (startResponse.status === 200) {
          alert("Monitoring started successfully");
        } else {
          throw new Error("Failed to start monitoring");
        }
      } else {
        throw new Error("Configuration submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000"); // Ensure correct URL

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setFileEvents((prevEvents) => [...prevEvents, data]); // Add new event
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      alert("An error occurred with the WebSocket connection.");
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event.reason);
    };

    return () => {
      socket.close(); // Ensure cleanup on component unmount
    };
  }, []);

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-8 py-10 bg-white mx-8 md:mx-0 shadow-md rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700">
              File Monitor Configuration
            </h2>
            <div className="py-8 text-gray-700 sm:text-lg sm:leading-7 space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm text-gray-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm text-gray-600"
              />
              <input
                type="text"
                placeholder="Path to Monitor"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm text-gray-600"
              />
              <input
                type="number"
                placeholder="Interval (seconds)"
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value, 10))}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm text-gray-600"
              />
              <input
                type="text"
                placeholder="Files to Track (comma-separated)"
                value={filesToTrack}
                onChange={handleFileTrackChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm text-gray-600"
              />

              <div className="pt-4 flex justify-between space-x-4">
                <button
                  onClick={submitAndStartMonitoring} // Start monitoring and submit configuration
                  className="bg-blue-500 text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Start Monitoring
                </button>
              </div>
            </div>

            <h3>File Events</h3>
            <ul>
              {fileEvents.map((event, index) => (
                <li key={index}>
                  {event.eventType} on {event.filePath}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
