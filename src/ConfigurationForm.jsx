import React, { useState } from "react";
import axios from "axios";

const ConfigurationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [path, setPath] = useState("");
  const [interval, setInterval] = useState(5);
  const [filesToTrack, setFilesToTrack] = useState("");

  // Function to handle input changes for files to track
  const handleFileTrackChange = (event) => {
    setFilesToTrack(event.target.value);
  };

  // Function to submit configuration to the backend
  const submitConfig = async () => {
    try {
      await axios.post("http://localhost:3000/config", {
        name,
        email,
        path,
        interval,
        files_to_track: filesToTrack.split(",").map((file) => file.trim()),
      });
      alert("Configuration submitted successfully");
    } catch (error) {
      console.error("Error submitting configuration:", error);
      alert("Failed to submit configuration");
    }
  };

  return (
    <div>
      <h2>File Monitor Configuration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Path to Monitor"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interval (seconds)"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Files to Track (comma-separated)"
        value={filesToTrack}
        onChange={handleFileTrackChange}
      />
      <button onClick={submitConfig}>Submit Configuration</button>
    </div>
  );
};

export default ConfigurationForm;
