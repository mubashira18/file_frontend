import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [textAdmin, setTextAdmin] = useState(false); // Correct casing for state variable
  const [formData, setFormData] = useState({
    usertype: "user", // Default to "user"
    secretkey: "",
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setTextAdmin(true);
    try {
      await axios.post("http://localhost:3000/register", formData);

      // Display success message
      alert("Registration successful");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Registration failed. Please try again.");
      setTextAdmin(false);
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-form">
        <h2 className="text-center">Signup</h2>
        <Form onSubmit={handleSignup}>
          {/* User Type */}
          <Form.Group controlId="usertype">
            <Form.Label className="label">User Type:</Form.Label>
            <Form.Control
              as="select"
              name="usertype"
              value={formData.usertype}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>

          {/* Secret Key for Admin */}
          {formData.usertype === "admin" && (
            <Form.Group controlId="secretkey">
              <Form.Label className="label">Secret Key:</Form.Label>
              <Form.Control
                type="password"
                name="secretkey"
                value={formData.secretkey}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {/* Full Name */}
          <Form.Group controlId="fullname">
            <Form.Label className="label">Full Name:</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="email">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Mobile */}
          <Form.Group controlId="mobile">
            <Form.Label className="label">Mobile:</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="password">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group controlId="confirmpassword">
            <Form.Label className="label">Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Signup Button */}
          <Button type="submit" className="submit-button mt-2">
            {textAdmin ? "Processing..." : "SIGNUP"}
          </Button>
        </Form>

        {/* Link to Login Page */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="loginbtn">
            Login here
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
