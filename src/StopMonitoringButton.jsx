import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // For defining expected prop types

const StopMonitoringButton = ({ setMonitoring, resetFields }) => {
  const handleStopMonitoring = async () => {
    try {
      const response = await axios.post("http://localhost:3000/stop");

      if (response.status === 200) {
        toast.success("Monitoring stopped successfully");
        setMonitoring(false); // Indicate that monitoring has stopped
        resetFields(); // Clear the fields and file events
      } else {
        toast.error("Failed to stop monitoring");
      }
    } catch (error) {
      console.error("Error stopping monitoring:", error.message);
      if (error.response && error.response.status === 400) {
        toast.error("No monitoring in progress.");
      } else {
        toast.error("Unexpected error. Please try again later.");
      }
    }
  };

  return (
    <button
      onClick={handleStopMonitoring}
      className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      Stop Monitoring
    </button>
  );
};

StopMonitoringButton.propTypes = {
  setMonitoring: PropTypes.func.isRequired, // Function to update monitoring status
  resetFields: PropTypes.func.isRequired, // Function to reset input fields
};

export default StopMonitoringButton;
