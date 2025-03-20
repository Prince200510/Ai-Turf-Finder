import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/MilestoneSection.css";

const MilestoneSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
      easing: "ease-in-out",
    });
  }, []);

  const milestones = [
    { count: "4+", title: "Cities", description: "We've expanded our reach to over 4 cities in just the last quarter.", animation: "fade-up" },
    { count: "823+", title: "Booking", description: "Our players have enjoyed more than 823 hours of playtime recently.", animation: "fade-down" },
    { count: "47+", title: "Turfs", description: "We've added 47 new turfs to our network in the past month.", animation: "fade-up" },
    { count: "2,500+", title: "Happy Players", description: "Over 2500 players have experienced our platform in the last quarter.", animation: "fade-down" },
  ];

  return (
    <section className="milestone-section">
      <h3 className="milestone-title" data-aos="zoom-in">Recent Milestones</h3>
      <h1 className="milestone-heading" data-aos="zoom-in-up">Just This Quarter</h1>
      <div className="milestone-grid">
        {milestones.map((milestone, index) => (
          <div key={index} className="milestone-card" data-aos={milestone.animation}>
            <h2 className="milestone-count">{milestone.count}</h2>
            <h3 className="milestone-card-title">{milestone.title}</h3>
            <p className="milestone-description">{milestone.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MilestoneSection;
