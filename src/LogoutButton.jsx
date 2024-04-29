import React from "react";
import { useNavigate } from "react-router-dom"; // Use for navigation
import { toast } from "react-toastify"; // For toast notifications

const LogoutButton = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleLogout = () => {
    // Clear authentication tokens or session data
    localStorage.removeItem("token"); // Assuming authToken is stored in localStorage
    sessionStorage.clear(); // Clear any other session data

    // Notify the user
    toast.success("Logged out successfully");

    // Redirect to login or home page
    navigate("/login"); // Redirecting to login page
  };

  return (
    <button
      onClick={handleLogout} // Call the logout handler
      className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton; // Export the component
