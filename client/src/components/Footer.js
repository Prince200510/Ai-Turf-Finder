import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFutbol } from "react-icons/fa";
import "./css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer style={{ marginLeft: "-30px", marginRight: "-30px" }}>
        <div className="footer1">
          <h1>
            <span><FaFutbol className="footer-icons" /></span> Turf Finder
          </h1>
          <p>
            Discover the best turf locations near you with Turf Finder. Book your slot, 
            find reviews, and enjoy the game at premium venues. Whether you're playing 
            football, cricket, or any other sport, Turf Finder helps you find the best 
            place for your match.
          </p>
          <div className="footer-social-media-icon">
            <h2><FaFacebookF /></h2>
            <h2><FaInstagram /></h2>
            <h2><FaTwitter /></h2>
            <h2><FaYoutube /></h2>
          </div>
        </div>

        <div className="footer2">
          <h1>Quick Links</h1>
          <p>Find Turf</p>
          <p>Book Now</p>
          <p>About Us</p>
          <p>Contact</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer3">
          <h1>Contact Us</h1>
          <p>Need help? Reach out for bookings, inquiries, or support.</p>
          <p title="Click to open Google Maps">
            <FaMapMarkerAlt /> Mumbai, Maharashtra, India - 400084
          </p>
          <p title="Call us">
            <FaPhone /> 9930521814
          </p>
          <p title="Email us">
            <FaEnvelope /> support@turffinder.com
          </p>
        </div>
      </footer>

      <div className="main-footer">
        <h2>&copy; {new Date().getFullYear()} Turf Finder - All Rights Reserved</h2>
      </div>
    </>
  );
};

export default Footer;
