import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "./css/TeamSection.css";
import member1 from "../assets/1.jpeg";
import member2 from "../assets/2.jpeg";
import member3 from "../assets/3.jpeg";

const teamMembers = [
  {
    id: 1,
    name: "Harsh",
    role: "Founder & CEO",
    image: member1,
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
  {
    id: 2,
    name: "Harsh",
    role: "Marketing Head",
    image: member2,
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
  {
    id: 3,
    name: "Harsh",
    role: "Tech Lead",
    image: member3,
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
];

const TeamSection = () => {
  return (
    <div className="team-members">
      <h2 data-aos="fade-up">Our People</h2>
      <div className="parent-team-member">
        {teamMembers.map((member) => (
          <div className="team-card" data-aos="fade-up" key={member.id}>
            <img src={member.image} alt={member.name} />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-icons">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
