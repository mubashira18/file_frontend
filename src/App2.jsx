import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to WebSocket server

const App2 = () => {
  const [fileChanges, setFileChanges] = useState([]);

  // Function to fetch all file changes from the backend
  const fetchFileChanges = async () => {
    try {
      const response = await fetch("http://localhost:3000/file-changes");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched file changes:", data);
        setFileChanges(data);
      } else {
        console.log("Error fetching file changes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching file changes:", error);
    }
  };

  useEffect(() => {
    // Fetch all file changes on component mount
    fetchFileChanges();

    // Listen for real-time file change notifications via WebSocket
    socket.on("fileChange", (fileChange) => {
      console.log("Received WebSocket event:", fileChange);
      setFileChanges((prevChanges) => [fileChange, ...prevChanges]); // Add new changes to the front of the list
    });

    return () => {
      socket.off("fileChange"); // Cleanup WebSocket event listener
    };
  }, []);

  return (
    <div>
      <h1>Real-Time File Changes</h1>
      <button onClick={fetchFileChanges}>Fetch All File Changes</button>{" "}
      {/* Button to fetch all file changes */}
      <ul>
        {fileChanges.map((change, index) => (
          <li key={index}>
            {change.filePath} - {change.changeType} -{" "}
            {new Date(change.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App2;
