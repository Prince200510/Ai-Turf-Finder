// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import TurfCare from "./pages/TurfCare/TurfCare";
// import TurfTesting from "./pages/TurfCare/TurfTesting";
// import Fertiliser from "./pages/TurfCare/Fertiliser";
// import Irrigation from "./pages/TurfCare/Irrigation";
// import Planting from "./pages/TurfCare/Planting";
// import AuthPage from "./pages/auth/AuthPage";
// import SearchTurf from "./pages/SearchTurf";
// import { AuthProvider } from "./AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Booking from "./pages/booking/Booking";
// import ChatBot from "./components/ChatBot";
// import About from "./pages/About";
// import Benefits from "./pages/choosingturf/Benefits";
// import Right_Turf from "./pages/choosingturf/Right_Turf";
// import Calculator from "./pages/choosingturf/Calculator";
// import Species from "./pages/choosingturf/Species";
// import Turf_Varieties from "./pages/Turf_Varieties/Turf_Varieties";
// import Contact from "./pages/Contact";

// const App = () => {
//   return (
//     <>
//     <ChatBot></ChatBot>
//     <Router>
//       <AuthProvider> 
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} /> 
//           <Route path="/TurfCare" element={<TurfCare />} /> 
//           <Route path="/TurfTesting" element={<TurfTesting />} /> 
//           <Route path="/Fertiliser" element={<Fertiliser />} /> 
//           <Route path="/Irrigation" element={<Irrigation />} /> 
//           <Route path="/Planting" element={<Planting />} /> 
//           <Route path="/Login" element={<AuthPage />} /> 
//           <Route path="/Booking/:city/:turfId" element={<Booking />} />
//           <Route path="/About" element={<About />} /> 
//           <Route path="/Benefits" element={<Benefits />} /> 
//           <Route path="/Right_Turf" element={<Right_Turf />} /> 
//           <Route path="/Calculator" element={<Calculator />} /> 
//           <Route path="/Species" element={<Species />} /> 
//           <Route path="/Turf_Varieties" element={<Turf_Varieties />} /> 
//           <Route path="/Contact" element={<Contact />} /> 

//           {/* <Route path="/SearchTurf" element={<SearchTurf />} />  */}
//           <Route path="/SearchTurf" element={
//             <ProtectedRoute>
//               <SearchTurf />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </AuthProvider>
//     </Router>
//     </>
//   );
// };

// export default App;







// // import React from "react";
// // import "./App.css";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Navbar from "./components/Navbar";
// // import TurfCare from "./pages/TurfCare/TurfCare";
// // import TurfTesting from "./pages/TurfCare/TurfTesting";
// // import Fertiliser from "./pages/TurfCare/Fertiliser";
// // import Irrigation from "./pages/TurfCare/Irrigation";
// // import Planting from "./pages/TurfCare/Planting";
// // import AuthPage from "./pages/auth/AuthPage";
// // import SearchTurf from "./pages/SearchTurf";
// // import { AuthProvider } from "./AuthContext";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // const App = () => {
// //   return (
// //     <Router>
// //     <AuthProvider>

// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} /> 
// //         <Route path="/TurfCare" element={<TurfCare />} /> 
// //         <Route path="/TurfTesting" element={<TurfTesting />} /> 
// //         <Route path="/Fertiliser" element={<Fertiliser />} /> 
// //         <Route path="/Irrigation" element={<Irrigation />} /> 
// //         <Route path="/Planting" element={<Planting />} /> 
// //         <Route path="/Login" element={<AuthPage />} /> 
// //         {/* <Route path="/SearchTurf" element={<ProtectedRoute element={<SearchTurf />} />} />  */}
// //         <Route path="/SearchTurf" element={
// //             <ProtectedRoute>
// //               <SearchTurf />
// //             </ProtectedRoute>
// //           } />

// //       </Routes>
// //   </AuthProvider>
// //   </Router>
// //   );
// // };

// // export default App;

// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Navbar from "./components/Navbar";
// // import "./App.css";
// // import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// // const App = () => {
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       setLoading(false);
// //     }, 2000); // Show spinner for 2 seconds
// //   }, []);

// //   return (
// //     <Router>
// //       {loading ? (
// //         // Full-screen loading with gradient spinner
// //         <div className="loading-screen">
// //           <div className="custom-spinner"></div>
// //         </div>
// //       ) : (
// //         // Show actual content after loading
// //         <>
// //           <Navbar />
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //           </Routes>
// //         </>
// //       )}
// //     </Router>
// //   );
// // };

// // export default App;
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TurfCare from "./pages/TurfCare/TurfCare";
import TurfTesting from "./pages/TurfCare/TurfTesting";
import Fertiliser from "./pages/TurfCare/Fertiliser";
import Irrigation from "./pages/TurfCare/Irrigation";
import Planting from "./pages/TurfCare/Planting";
import AuthPage from "./pages/auth/AuthPage";
import SearchTurf from "./pages/SearchTurf";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Booking from "./pages/booking/Booking";
import ChatBot from "./components/ChatBot";
import About from "./pages/About";
import Benefits from "./pages/choosingturf/Benefits";
import Right_Turf from "./pages/choosingturf/Right_Turf";
import Calculator from "./pages/choosingturf/Calculator";
import Species from "./pages/choosingturf/Species";
import Turf_Varieties from "./pages/Turf_Varieties/Turf_Varieties";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      <ChatBot />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TurfCare" element={<TurfCare />} />
            <Route path="/TurfTesting" element={<TurfTesting />} />
            <Route path="/Fertiliser" element={<Fertiliser />} />
            <Route path="/Irrigation" element={<Irrigation />} />
            <Route path="/Planting" element={<Planting />} />
            <Route path="/Login" element={<AuthPage />} />
            <Route path="/Booking/:city/:turfId" element={<Booking />} />
            <Route path="/About" element={<About />} />
            <Route path="/Benefits" element={<Benefits />} />
            <Route path="/Right_Turf" element={<Right_Turf />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/Species" element={<Species />} />
            <Route path="/Turf_Varieties" element={<Turf_Varieties />} />
            <Route path="/Contact" element={<Contact />} />
            <Route
              path="/SearchTurf"
              element={
                <ProtectedRoute>
                  <SearchTurf />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
