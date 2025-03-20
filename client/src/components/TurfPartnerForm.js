import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/HowItWorks.css";
import { database, ref, push } from "../Firebase.js";
import Swal from "sweetalert2";

const TurfPartnerForm = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [form, setForm] = useState({
    name: "",
    turfName: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.turfName || !form.phone || !form.city) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    try {
      await push(ref(database, "join_us_today"), form);
      Swal.fire("Success", "Your request has been submitted!", "success");
      setForm({ name: "", turfName: "", phone: "", city: "" });
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };

  return (
    <div className="container">
      <div className="content" data-aos="fade-right">
        <h4>Become a partner</h4>
        <h1>Own a Turf? Let Turf Finder Be Your Ultimate Partner!</h1>
        <p>
          Turf Finder is the perfect ally for turf owners looking to improve their
          booking process and increase their turf’s reach. Join us today to make
          the most out of your facility with ease and efficiency!
        </p>
      </div>

      <div className="form-container" data-aos="fade-left">
        <input  type="text"  name="name"  placeholder="Your name"  value={form.name}  onChange={handleChange}  data-aos="fade-up"/>
        <input  type="text"  name="turfName"  placeholder="Turf Name"  value={form.turfName}  onChange={handleChange}  data-aos="fade-up"  data-aos-delay="100"/>
        <input  type="tel"  name="phone"  placeholder="Phone No."  value={form.phone}  onChange={handleChange}  data-aos="fade-up"  data-aos-delay="200"/>
        <input  type="text"  name="city"  placeholder="City"  value={form.city}  onChange={handleChange}  data-aos="fade-up"  data-aos-delay="300"/>
        <button className="submit-btn" onClick={handleSubmit} data-aos="zoom-in">Join Us Today →</button>
      </div>
    </div>
  );
};

export default TurfPartnerForm;
