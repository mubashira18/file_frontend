import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css"; // Import the CSS file for styling

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v8r8oom",
        "template_8o86q5g",
        form.current,
        "GLqnWv9lQro_m3sHo"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Email sent successfully!"); // Display success toast
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email."); // Display error toast
        }
      );
  };

  return (
    <div className="contact-container bg-slate-500">
      <h1 className="text-3xl text-red-300 pb-4">Contact Us</h1>
      <p>
        If you have any questions or concerns, feel free to reach out to us. We
        will get back to you as soon as possible.
      </p>

      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <label htmlFor="user_name">Name:</label>
        <input
          type="text"
          id="user_name"
          className="text-black"
          name="user_name"
          required
        />

        <label htmlFor="user_email">Email:</label>
        <input
          type="email"
          className="text-black"
          id="user_email"
          name="user_email"
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          className="text-black"
          required
        ></textarea>

        <input type="submit" value="Send" />
      </form>

      <ToastContainer />
    </div>
  );
};

export default Contact;
