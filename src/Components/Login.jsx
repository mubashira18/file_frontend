import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formDataAdmin, setFormDataAdmin] = useState({
    email: "",
    password: "",
  });
  const [formDataUser, setFormDataUser] = useState({
    email: "",
    password: "",
  });
  const [textAdmin, settextAdmin] = useState(false);
  const [textUser, settextUser] = useState(false);
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const navigate = useNavigate();

  const handleChangeAdmin = (e) => {
    setFormDataAdmin({ ...formDataAdmin, [e.target.name]: e.target.value });
  };

  const handleChangeUser = (e) => {
    setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    settextAdmin(true);
    setAuthAdmin(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formDataAdmin
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const userType = response.data.usertype; // Assuming the server returns the user's usertype

      if (userType === "admin") {
        alert("admin login successful");

        navigate("/admindashboard");
        toast.success("Admin successfully logged in!");
      } else {
        alert("invalid admin details");
      }

      // Show success toast notification
    } catch (error) {
      toast.error("Admin login failed:", error);

      if (error.response && error.response.status === 401) {
        toast.error(
          "admin login failed. Please check your email and password."
        );
      } else {
        toast.error("admin login failed. An error occurred.");
      }
    } finally {
      setAuthAdmin(true);
      settextAdmin(false);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    settextUser(true);
    setAuthUser(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formDataUser
      );

      const token = response.data.token;
      const userType = response.data.usertype; // Assuming the server returns the user's usertype
      localStorage.setItem("token", token);

      if (userType === "user") {
        alert("user login successful");

        navigate("/dashboard");
        toast.success("user successfully logged in!");
      } else {
        alert("invalid user details");
      }
    } catch (error) {
      toast.error("user login failed:", error);

      if (error.response && error.response.status === 401) {
        toast.error("User login failed. Please check your email and password.");
      } else {
        toast.error("User login failed. An error occurred.");
      }
    } finally {
      setAuthUser(true);
      settextUser(false);
    }
  };

  return (
    <Container className="neumorphic-container1">
      <div className="neumorphic-form1 admin-form">
        <h2 className="text-center">Admin Login</h2>
        <Form onSubmit={handleAdminLogin}>
          <Form.Group controlId="emailAdmin" className="form-group">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formDataAdmin.email}
              onChange={handleChangeAdmin}
              className="input neumorphic-input"
              required
            />
          </Form.Group>
          <Form.Group controlId="passwordAdmin" className="form-group">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formDataAdmin.password}
              onChange={handleChangeAdmin}
              className="input neumorphic-input"
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="submit-button mt-2 neumorphic-button"
          >
            {textAdmin ? "processing" : "LOGIN"}
          </Button>
        </Form>
      </div>
      <div className="neumorphic-form1 user-form">
        <h2 className="text-center">User Login</h2>
        <Form onSubmit={handleUserLogin}>
          <Form.Group controlId="emailUser" className="form-group">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formDataUser.email}
              onChange={handleChangeUser}
              className="input neumorphic-input"
              required
            />
          </Form.Group>
          <Form.Group controlId="passwordUser" className="form-group">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formDataUser.password}
              onChange={handleChangeUser}
              className="input neumorphic-input"
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="submit-button mt-2 neumorphic-button"
          >
            {textUser ? "processing..." : "LOGIN"}
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Login;
