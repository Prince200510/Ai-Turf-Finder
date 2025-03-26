import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import "./About.css";
import Img1 from "../assets/content-image-turf-rolls.jpg"; 
import Img2 from "../assets/content-image-washed-turfgrass.jpg"; 

// Initialize AOS for animations
AOS.init({ duration: 1000 });

const teamMembers = [
  {
    name: "Harsh",
    role: "Founder & CEO",
    img: Img1,
  },
  {
    name: "Harsh",
    role: "Marketing Head",
    img: Img2,
  },
  {
    name: "Harsh",
    role: "Tech Lead",
    img: Img1,
  },
  {
    name: "Harsh",
    role: "Operations Head",
    img: Img2,
  },
];

const AboutUs = () => {
  return (
    <>
      <div className="about-us-parent">
        <div className="about-container">
          <section className="mission-vision-section">
            <div className="mission-card" data-aos="fade-right">
              <h2 className="section-title">🌱 Our Mission</h2>
              <p className="section-text">
                <ul>
                  <li>Our mission is to create a seamless and efficient platform that empowers sports enthusiasts by providing an easy and transparent process for booking high-quality sports turfs. </li>
                  <li>We are dedicated to making sports accessible to everyone by offering affordable, well-maintained, and safe playing environments.</li>
                  <li>Our goal is to inspire communities to embrace a healthier and more active lifestyle by encouraging participation in various sports and fitness activities. </li>
                  <li>We also aim to promote fair play, inclusivity, and a sense of community by bridging the gap between players and premium sports facilities.</li>
                </ul>
              </p>
            </div>

            <div className="vision-card" data-aos="fade-left">
              <h2 className="section-title">🎯 Our Vision</h2>
              <p className="section-text">
                <ul>
                  <li>Our vision is to be the most trusted and innovative platform that redefines the way people access sports facilities, promoting a culture where fitness, teamwork, and passion for sports become an essential part of everyday life. </li>
                  <li>To be the leading turf booking platform that promotes a healthy lifestyle through sports and fitness by creating a connected community.</li>
                  <li>  We envision a future where technology meets sports, enabling AI-driven recommendations to enhance user experience and provide tailored turf options for different skill levels and preferences.                </li>
                  <li>  Our long-term goal is to expand our reach to multiple cities and communities, creating a global ecosystem that nurtures talent, fosters collaboration, and inspires people of all ages to stay fit through sports.                  </li>
                </ul>
              </p>
            </div>
          </section>
          <section className="section future-plans" data-aos="fade-up">
            <h2 className="section-title">🚀 Our Future Plans</h2>
            <p className="section-text">
              As we continue to grow, our future plans revolve around expanding our presence across multiple cities, ensuring that more communities have access to top-quality sports turfs. 
              We aim to introduce AI-driven ground maintenance systems that will automatically assess turf conditions, ensuring optimal playing experiences and safety. 
              Our roadmap includes integrating smart booking features that allow users to book slots based on peak hours, weather conditions, and user preferences.
            </p>

            <p className="section-text">
              Additionally, we are exploring partnerships with fitness coaches and sports academies to offer personalized training sessions, workshops, and events to help individuals hone their skills. 
              We plan to launch a loyalty rewards system, where frequent users can avail of exclusive discounts, early access to premium turfs, and exciting membership perks. 
              Our long-term goal is to create a connected ecosystem where players, coaches, and turf owners collaborate seamlessly to foster a thriving sports community.
            </p>

            <p className="section-text">
              To further enhance the user experience, we envision leveraging augmented reality (AR) and virtual reality (VR) technologies to allow users to visualize and explore turf layouts before booking. 
              Moreover, we plan to build a community-driven review and rating system that empowers users to share feedback, ensuring continuous improvement and maintaining high service standards.
            </p>

          </section>
          <section className="section team-section">
            <h2 className="section-title">🙌 Meet Our Team</h2>
            <div className="team-container">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="team-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-image"
                  />
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={20} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="section contact-section" data-aos="fade-up">
            <h2 className="section-title">📞 Contact Us</h2>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone size={20} className="contact-icon" />
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <FaEnvelope size={20} className="contact-icon" />
                <p>support@turffinder.com</p>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt size={20} className="contact-icon" />
                <p>Mumbai, India</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
