import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/HowItWorks.css";
import howwork from "../assets/howwork.gif";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="how-it-works">
      <h3 data-aos="fade-up">How TurfFinder Works</h3>
      <h1 data-aos="fade-up">Transform your game day with TurfFinder</h1>
      <div className="how-it-works-container">
        <img
          src={howwork}
          alt="How TurfFinder Works"
          className="howwork-img"
          data-aos="zoom-in"
        />
        <div className="steps">
          <div className="step" data-aos="fade-left">
            <h2>Download The App</h2>
            <p>
              Download the TurfFinder app for easy turf bookings, exclusive
              deals, and real-time updates.
            </p>
          </div>
          <div className="step" data-aos="fade-left" data-aos-delay="200">
            <h2>Search For Turfs</h2>
            <p>
              Find the perfect turf for your game with TurfFinder’s
              easy-to-use search feature.
            </p>
          </div>
          <div className="step" data-aos="fade-left" data-aos-delay="400">
            <h2>Select Slot & Pay</h2>
            <p>
              Choose your preferred time slot and complete your booking with
              secure payment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
