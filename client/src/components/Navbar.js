// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { FaLeaf } from "react-icons/fa";
// import "./css/Navbar.css";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
      
//       if (currentScrollPos > 50) {
//         // Hide navbar when scrolling down or up (except at top)
//         setVisible(false);
//       } else {
//         // Show navbar only when at the top
//         setVisible(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`navbar ${visible ? "visible" : "hidden"}`}>
//       <div className="nav-container">
//         <div className="nav-icon">
//           <h1>
//             Turf <span>Finder</span> <FaLeaf className="turf-icon" />
//           </h1>
//         </div>
//         <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FiX /> : <FiMenu />}
//         </div>

//         <ul className={menuOpen ? "nav-links open" : "nav-links"}>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>About</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Search Turf</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Turf Care</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Choosing Turf</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Turf Varieties</Link></li>
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Contact</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import "./css/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos <= 50);

      // Close menu when scrolling starts
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]); // Depend on menuOpen to close on scroll

  return (
    <>
      {/* Background Overlay when Menu is Open */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

      <nav className={`navbar ${visible ? "visible" : "hidden"}`}>
        <div className="nav-container">
          <div className="nav-icon">
            <h1>
              Turf <span>Finder</span> <FaLeaf className="turf-icon" />
            </h1>
          </div>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>

          <ul className={menuOpen ? "nav-links open" : "nav-links"}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/SearchTurf" onClick={() => setMenuOpen(false)}>Search Turf</Link></li>
            <li className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <a href="#" className="dropbtn">Turf Care</a>
              {isOpen && (
                <ul className="dropdown-content">
                  <li><Link to="/TurfCare" onClick={() => setMenuOpen(false)}>After Planting Care</Link></li>
                  <li><Link to="/TurfTesting" onClick={() => setMenuOpen(false)}>Analytical Testing</Link></li>
                  <li><Link to="/Fertiliser" onClick={() => setMenuOpen(false)}>Fertiliser</Link></li>
                  <li><Link to="/Irrigation" onClick={() => setMenuOpen(false)}>Irrigation</Link></li>
                  <li><Link to="/Planting" onClick={() => setMenuOpen(false)}>Planting</Link></li>
                </ul>
              )}
            </li>
            <li className="dropdown" onMouseEnter={() => setIsOpen1(true)} onMouseLeave={() => setIsOpen1(false)}>
              <a href="#" className="dropbtn">Choosing Turf</a>
              {isOpen1 && (
                <ul className="dropdown-content">
                  <li><Link to="/Benefits" onClick={() => setMenuOpen(false)}>Benefits of Turf</Link></li>
                  <li><Link to="/Right_Turf" onClick={() => setMenuOpen(false)}>Choosing the Right Turf</Link></li>
                  <li><Link to="/Calculator" onClick={() => setMenuOpen(false)}>Turf Area Calculator</Link></li>
                  <li><Link to="/Species" onClick={() => setMenuOpen(false)}>Turf Species Difference</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/Turf_Varieties" onClick={() => setMenuOpen(false)}>Turf Varieties</Link></li>
            <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><button onClick={() => setMenuOpen(false)}><Link onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} to="/Login" style={{color: isHovered ? "white" : "white"}}>Login</Link></button></li>
          </ul>
        </div>
      </nav>
    </>
  );
}
