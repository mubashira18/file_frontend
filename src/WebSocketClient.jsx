import React, { useEffect, useState } from "react";

const WebSocketClient = () => {
  const [fileEvents, setFileEvents] = useState([]); // To store file monitoring events

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000"); // Connect to WebSocket server

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFileEvents((prevEvents) => [...prevEvents, data]); // Append new event
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close(); // Clean up when component is unmounted
    };
  }, []); // Runs only once on component mount

  return (
    <div>
      <h2>File Events</h2>
      <ul>
        {fileEvents.map((event, index) => (
          <li key={index}>
            {event.eventType} on {event.filePath}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketClient;
