import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Contact.css";
import { database, ref, push } from "../Firebase.js";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        contactMethod: "Email",
        message: "",
      });
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
          Swal.fire("Error", "All fields are required!", "error");
          return;
        }
    
        try {
          await push(ref(database, "contacts"), form);
          Swal.fire("Success", "Your message has been sent!", "success");
          setForm({ name: "", email: "", phone: "", subject: "", contactMethod: "Email", message: "" });
        } catch (error) {
          Swal.fire("Error", "Something went wrong. Try again!", "error");
        }
      };
  return (
    <div>
         <div className="container-parent-turf-care">
         <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <select name="contactMethod" value={form.contactMethod} onChange={handleChange}>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
         </div>

    </div>
  )
}
