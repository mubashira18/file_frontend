import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StopMonitoringButton = ({ setMonitoring }) => {
  const handleStopMonitoring = async () => {
    try {
      const response = await axios.post("http://localhost:3000/stop");

      if (response.status === 200) {
        toast.success("Monitoring stopped successfully");
        setMonitoring(false); // Indicate monitoring is stopped
      } else {
        toast.error("Failed to stop monitoring"); // Handle unexpected status
      }
    } catch (error) {
      console.error("Error stopping monitoring:", error.message);
      if (error.response) {
        if (error.response.status === 400) {
          // Handle 400 errors from backend
          toast.error("No monitoring in progress.");
        } else {
          toast.error(
            `Error stopping monitoring: ${error.response.data.error}`
          );
        }
      } else {
        // Network issues or unexpected errors
        toast.error("Unexpected error. Please try again later.");
      }
    }
  };

  return (
    <button
      onClick={handleStopMonitoring} // Call the handler when clicked
      className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      Stop Monitoring
    </button>
  );
};

export default StopMonitoringButton;
