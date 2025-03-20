import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Main.css";
import turf1 from "../assets/1.jpeg";
import turf2 from "../assets/2.jpeg";
import turf3 from "../assets/3.jpeg";
import turf4 from "../assets/4.jpeg";
import turf5 from "../assets/5.jpeg";
import turf6 from "../assets/6.jpeg";
import turf7 from "../assets/7.jpeg";
import turf8 from "../assets/8.jpeg";
import charityImg from "../assets/charity.webp";
import MilestoneSection from '../components/MilestoneSection';
import TeamSection from '../components/TeamSection';
import HowItWorks from '../components/HowItWorks';
import TurfPartnerForm from '../components/TurfPartnerForm';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const turfs = [
  { id: 1, name: "Green Paradise Turf", location: "Andheri, Mumbai", image: turf1 },
  { id: 2, name: "Elite Sports Arena", location: "Bandra, Mumbai", image: turf2 },
  { id: 3, name: "Champion's Ground", location: "Powai, Mumbai", image: turf3 },
  { id: 4, name: "Victory Turf", location: "Thane, Mumbai", image: turf4 },
  { id: 5, name: "Pro Kick Arena", location: "Goregaon, Mumbai", image: turf5 },
  { id: 6, name: "Turbo Sports Field", location: "Borivali, Mumbai", image: turf6 },
  { id: 7, name: "Striker's Heaven", location: "Navi Mumbai", image: turf7 },
  { id: 8, name: "Soccer Pro Turf", location: "Vasai, Mumbai", image: turf8 },
];

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  const handleNavigate = () => {
    navigate("/SearchTurf");
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="container-parent-home">
        <div className="home-content">
          <div className="home-child-content">
            <div data-aos="zoom-in">
              <h1>Welcome to Turf Finder</h1>
              <p>Your one-stop destination for discovering the best turf fields near you. Book, compare, and enjoy the game!</p>
              <button onClick={handleNavigate}>Find Your Best Turf!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-extra-content">
        <h2 data-aos="fade-up">Why Choose Turf Finder?</h2>
        <p data-aos="fade-up">
          We provide the best selection of turfs near you, ensuring quality, affordability, and convenience.
        </p>

        <div className="features">
          <div className="feature-card" data-aos="fade-right">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Locate Nearby Turfs</h3>
            <p>Find turfs in your area quickly and easily.</p>
          </div>

          <div className="feature-card" data-aos="fade-up">
            <i className="fas fa-futbol"></i>
            <h3>Top-Quality Fields</h3>
            <p>We ensure only the best-maintained fields are listed.</p>
          </div>

          <div className="feature-card" data-aos="fade-left">
            <i className="fas fa-calendar-check"></i>
            <h3>Easy Booking</h3>
            <p>Reserve your favorite turf with just a few clicks.</p>
          </div>
        </div>

        <div className="home-extra-content">
            <h2 data-aos="fade-up">Our Collections</h2>
            <p data-aos="fade-up">
                Explore the best selection of turfs near you, ensuring quality, affordability, and convenience.
            </p>
            <div className="turf-collection">
                {turfs.map((turf) => (
                  <div className="turf-card" style={{ height: "250px"}} data-aos="fade-right" key={turf.id}>
                    <img src={turf.image} alt={turf.name} />
                    <div className="turf-content">
                      <h3>{turf.name}</h3>
                      <h4>
                        <FaMapMarkerAlt /> {turf.location}
                      </h4>
                    </div>
                  </div>
                ))}
            </div>
        </div>
        <div class="home-nav-bar">
            <ul className="home-nav-bar-child">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Search Turf</Link></li>
              <li><Link to="/">Turf Care</Link></li>
              <li><Link to="/">Choosing Turf</Link></li>
              <li><Link to="/">Turf Varieties</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
        </div>
        <div class="team-members">
          <TeamSection />
        </div>
        <section className="charity-section" data-aos="fade-up">
        <h3 className="charity-title" data-aos="fade-down">Charity</h3>
        <h1 className="charity-heading" data-aos="zoom-in">
          Game For A Greater <span className="highlight">Good</span> – Your Play <br></br> Fuels <span className="highlight">Social Change</span>
        </h1>
        <p className="charity-description" data-aos="fade-right" style={{color: "#fff", marginTop: "20px"}}>
          Each game you play is a step towards change with our <strong>‘For, By, To – Society’</strong> initiative. 
          By allocating 2% of our profits to vital causes — <strong>at no extra cost to you</strong> — your playtime becomes a meaningful 
          contribution to a better world.
        </p>
        <img src={charityImg} alt="Charity" data-aos="flip-left" className="charity-image" />
      </section>

      {/* New Section Below Charity
      <section className="new-section">
        <h3 className="new-title">New Initiative</h3>
        <h1 className="new-heading">
          Play <span className="highlight">More</span>, Earn <span className="highlight">Rewards</span>
        </h1>
        <p className="new-description">
          Your dedication to gaming now comes with exclusive perks! The more you play, the more rewards 
          you unlock. Stay engaged and earn exciting benefits while making a positive impact.
        </p>
        <img src={anotherImg} alt="New Initiative" className="new-image" />
      </section> */}
      <MilestoneSection />
      <HowItWorks />
      <TurfPartnerForm />
      <Footer />
      </div>
    </div>
  );
}
