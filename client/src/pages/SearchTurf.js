import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import "./SearchTurf.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import RatingComponent from "../components/RatingComponent"; // Import the rating component
import AOS from "aos";
import "aos/dist/aos.css";
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBwhqwEl5P48hGqBW47c_jKvnU0hPHsxs",
  authDomain: "turf-finder-4bfdd.firebaseapp.com",
  projectId: "turf-finder-4bfdd",
  storageBucket: "turf-finder-4bfdd.firebasestorage.app",
  messagingSenderId: "376213126620",
  appId: "1:376213126620:web:c4114dfc326666a8e5e319",
  measurementId: "G-JKMG23HYKV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function SearchTurf() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [turfTypeFilter, setTurfTypeFilter] = useState([]);
  const [turfVarietyFilter, setTurfVarietyFilter] = useState("");
  const [predictedTurfs, setPredictedTurfs] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [showPredicted, setShowPredicted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [predictionMessage, setPredictionMessage] = useState(
    "🤖 AI is predicting the best turfs..."
  );
  
  const predictionMessages = [
    "⏳ AI is taking some time... Hold tight!",
    "💡 AI is analyzing all the data. Be patient!",
    "🏆 AI is getting the best result for you...",
    "⚡ Almost there! The wait is over...",
    "🤖 AI is predicting the best turfs...",
  ];

  useEffect(() => {
    if (isPredicting) {
      let index = 0;
      const interval = setInterval(() => {
        setPredictionMessage(predictionMessages[index]);
        AOS.refresh(); // Refresh AOS to apply new animation dynamically
        index = (index + 1) % predictionMessages.length;
      }, 5000); // Switch messages every 2 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isPredicting]);
  
  
  useEffect(() => {
    // const turfRef = ref(db, "Turf");
    const turfRef = ref(db, "Turf1");
    onValue(turfRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTurfs = [];
        Object.keys(data).forEach((city) => {
          Object.keys(data[city]).forEach((turfName) => {
            const turf = data[city][turfName];
            const totalRatings = (turf.ratings1 || 0) + 
                     (turf.ratings2 || 0) + 
                     (turf.ratings3 || 0) + 
                     (turf.ratings4 || 0) + 
                     (turf.ratings5 || 0);

            loadedTurfs.push({
              id: turfName,
              id1: turf.id,
              name: turf.Turf_name,
              location: city,
              address: turf.Address,
              price: turf["price per hour"],
              turfType: turf.Turf_type,
              turfVariety: turf.Turf_Variety,
              ratings: [
                turf.ratings1 || 0,
                turf.ratings2 || 0,
                turf.ratings3 || 0,
                turf.ratings4 || 0,
                turf.ratings5 || 0,
              ],
              totalRatings,
              image: turf.image || "",
              userRating: null,
              
            });
          });
        });

        if (user) {
          // const userKey = user.email.replace(/\./g, "_");
          const userKey = user?.email ? user.email.replace(/\./g, "_") : "";
          const userRef = ref(db, `users/${userKey}/ratings`);
          onValue(userRef, (userSnapshot) => {
            const userRatings = userSnapshot.val();
            if (userRatings) {
              loadedTurfs.forEach((turf) => {
                if (userRatings[turf.id]) {
                  turf.userRating = userRatings[turf.id].rating;
                }
              });
            }
            setTurfs(loadedTurfs);
            setFilteredTurfs(loadedTurfs);
          });
        } else {
          setTurfs(loadedTurfs);
          setFilteredTurfs(loadedTurfs);
        }
      }

    applyFilters(); 
    });
  }, [user]);

  
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setTurfTypeFilter((prevFilter) =>
      checked ? [...prevFilter, value] : prevFilter.filter((type) => type !== value)
    );
  };

  const applyFilters = () => {
    resetTurfs(); 
    let filtered = turfs;
  
    if (cityFilter) {
      filtered = filtered.filter((turf) => turf.location.toLowerCase() === cityFilter.toLowerCase());
    }    
  
    if (turfTypeFilter.length > 0) {
      filtered = filtered.filter((turf) => turfTypeFilter.includes(turf.turfType));
    }
  
    if (turfVarietyFilter) {
      filtered = filtered.filter((turf) => turf.turfVariety === turfVarietyFilter);
    }
  
    setFilteredTurfs(filtered);
    setShowPredicted(false); // ✅ Hide predictions when filters change
    setPredictedTurfs([]);
  };
  

  const logoutAndClearSession = () => {
    handleLogout();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleBooking = (city, turfId) => {
    navigate(`/Booking/${encodeURIComponent(city)}/${encodeURIComponent(turfId)}`);
  };

  const predictBestTurf = async () => {

    setIsPredicting(true); // Show "AI is predicting..." message
    setShowPredicted(false); // Hide default turf list
    setPredictedTurfs([]);

    const turfsToPredict = cityFilter || turfTypeFilter.length > 0 || turfVarietyFilter
    ? filteredTurfs // Use filtered data
    : turfs; // Otherwise use all turfs

  console.log(`📍 Predicting for city: ${cityFilter || "All Cities"}`);
  console.log("🎯 Turfs to Predict:", turfsToPredict.map(t => t.name));
  
    console.log(`📍 Predicting for city: ${cityFilter || "All Cities"}`);
  
    const turfPredictions = [];
  
    for (const turf of turfs) {
      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: turf.location || "",
            address: turf.address || "",
            contact_number: turf.contact || "0000000000",
            turf_variety: turf.turfVariety || "",
            turf_type: turf.turfType || "",
            price_per_hour: parseFloat(turf.price) || 0,
            ratings_1_star: parseInt(turf.ratings?.[0] || 0),
            ratings_2_star: parseInt(turf.ratings?.[1] || 0),
            ratings_3_star: parseInt(turf.ratings?.[2] || 0),
            ratings_4_star: parseInt(turf.ratings?.[3] || 0),
            ratings_5_star: parseInt(turf.ratings?.[4] || 0),
            booking_count: parseInt(turf.booking_count || 0),
          }),
        });
  
        if (!response.ok) {
          console.error(`❌ Error predicting for ${turf.name}: Failed to fetch.`);
          continue; // Skip to the next turf if prediction fails
        }
  
        const result = await response.json();
  
        if (result.success) {
          const predictedRating = parseFloat(result.predicted_rating);
          turfPredictions.push({ ...turf, predictedRating });
        } else {
          console.error(`❌ Prediction error for ${turf.name}: ${result.error}`);
        }
      } catch (error) {
        console.error(`❌ Error predicting best turf: ${turf.name}`, error);
      }
    }
  
    // ✅ Sort and get top 5 turfs
    const top5Turfs = turfPredictions
      .sort((a, b) => b.predictedRating - a.predictedRating) // Highest to lowest
      .slice(0, 5); // Get top 5
      console.log("✅ Top 5 Predicted Turfs:", top5Turfs);
      setPredictedTurfs([...top5Turfs]); 
      setIsPredicting(false);
      setShowPredicted(true);
  };

  const resetTurfs = () => {
    setFilteredTurfs(turfs); // Reset to original loaded turfs
    setPredictedTurfs([]); // 🛑 Clear predicted turfs properly
    setShowPredicted(false); // Hide predicted view
    setIsPredicting(false); // Hide AI prediction message
    console.log("🧹 Resetting Turfs...");
console.log("Filtered Turfs:", filteredTurfs);
console.log("Predicted Turfs:", predictedTurfs);

  };
  
  const handleSearch = () => {
    resetTurfs(); 
    if (!searchTerm) {
      setFilteredTurfs(turfs);
      setShowPredicted(false); // Reset predictions if search is applied
      return;
    }
  
    const filtered = turfs.filter(
      (turf) =>
        turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredTurfs(filtered);
    setShowPredicted(false); // Hide predictions when search is applied
  };
  
  
  // const predictBestTurf = async (turf) => {
  //   setIsPredicting(true); // Show prediction message
  // setPredictedTurfs([]);
  //   console.log("📚 Turf Data:", turf); // Debug turf data
  
  //   // Check for Missing or Invalid Critical Fields
  //   if (
  //     !turf.location || // City
  //     !turf.address || // Address
  //     !turf.turfType || // Turf Type
  //     !turf.turfVariety || // Turf Variety
  //     !turf.price ||
  //     isNaN(parseFloat(turf.price)) || // Ensure price is valid
  //     parseFloat(turf.price) <= 0 || // Invalid price check
  //     turf.ratings?.some(
  //       (rating) => isNaN(parseInt(rating)) || parseInt(rating) < 0
  //     ) // Validate ratings
  //   ) {
  //     console.error(
  //       `❌ Error: Invalid or missing data for prediction in turf: ${turf.name}`
  //     );
  //     alert(`Missing or invalid data for turf: ${turf.name}`);
  //     return; // Skip prediction if data is invalid
  //   }
  
  //   try {
  //     const response = await fetch("http://localhost:5000/predict", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         city: turf.location || "",
  //         address: turf.address || "",
  //         contact_number: turf.contact || "0000000000",
  //         turf_variety: turf.turfVariety || "",
  //         turf_type: turf.turfType || "",
  //         price_per_hour: parseFloat(turf.price) || 0,
  //         ratings_1_star: parseInt(turf.ratings?.[0] || 0),
  //         ratings_2_star: parseInt(turf.ratings?.[1] || 0),
  //         ratings_3_star: parseInt(turf.ratings?.[2] || 0),
  //         ratings_4_star: parseInt(turf.ratings?.[3] || 0),
  //         ratings_5_star: parseInt(turf.ratings?.[4] || 0),
  //         booking_count: parseInt(turf.booking_count || 0),
  //       }),
  //     });
  
  //     console.log("✅ City for Prediction:", turf.location);
  
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch prediction.");
        
  //     }
  
  //     const result = await response.json();
  
  //     if (result.success) {
  //       // ✅ Convert float32 to JS number (ensure serialization)
  //       const predictedRating = parseFloat(result.predicted_rating);
  
  //       console.log(`✅ Prediction for ${turf.name}: ${predictedRating}`);
  //     } else {
  //       console.error(`❌ Error predicting for ${turf.name}:`, result.error);
  //     }
  //   } catch (error) {
  //     console.error(`❌ Error predicting best turf: ${turf.name}`, error);
  //   }
  // };
  
  


  return (
    <div className="search-turf-container">
      <div className="search-turf-container-child">
        <div className="search-turf-search-engine">
          <input type="text" className="search-input" onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); } }}placeholder="Search by Turf Name or City" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className="search-button" onClick={handleSearch}>🔍 Search</button>

          <div className="search-display-1">
            <div className="search-display">
              <div className="search-filter-container">
                <div className="search-filter">
                  <h3>Filter Data</h3>
                  <hr />
                  <label>Select City:</label>
                  <select className="filter-dropdown" onChange={(e) => setCityFilter(e.target.value)}>
                    <option value="">-- Select City --</option>
                    <option value="">All Select</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>

                  <label>Turf Type:</label>
                  <div className="checkbox-group">
                    {["Football", "Cricket", "Tennis", "Hockey"].map((type) => (
                      <label key={type}>
                        <input type="checkbox" value={type} onChange={handleFilterChange} /> {type}
                      </label>
                    ))}
                  </div>

                  <label>Select Turf Variety:</label>
                  <select className="filter-dropdown" onChange={(e) => setTurfVarietyFilter(e.target.value)}>
                    <option value="">-- Select Turf Variety --</option>
                    <option value="Artificial">Artificial</option>
                    <option value="Natural Grass">Natural Grass</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>

                  <button className="filter-button" onClick={applyFilters}>Apply Filters</button>
                  {/* <button
  className="filter-button"
  onClick={() => {
    if (turfs.length > 0) {
      turfs.forEach((turf) => predictBestTurf(turf)); // ✅ Loop through turfs
    } else {
      alert("No turfs available for prediction.");
    }
  }}
>
  Predict Best Turf
</button> */}<button
  className="filter-button"
  onClick={predictBestTurf}
>
 Use Ai for the Best Turf
</button>




                  {user ? (
                    <div className="user-auth-container">
                      <p className="user-email">📧 {user.email}</p>
                      <button className="logout-button" onClick={logoutAndClearSession}>
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="user-auth-container">
                      <p>🚀 Please log in to continue.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="search-turf-container">
              {/* {filteredTurfs.length > 0 ? (
                filteredTurfs.map((turf) => (
                  <div key={turf.id} className="turf-card">
                    <img src={turf.image} alt={turf.name} className="turf-image" />
                    <div className="turf-details">
                      <h3>{turf.name}</h3>
                      <p><strong>Location:</strong> {turf.location}</p>
                      <p><strong>Price per Hour:</strong> ₹{turf.price}</p>
                      <RatingComponent turf={turf} db={db} user={user} /> <span className="rating-count">({Number(turf.totalRatings) || 0} Ratings)</span>
                      <button className="book-now" onClick={() => handleBooking(turf.location, turf.id1)}>Book Now</button> 
                    </div>
                  </div>
                ))
              ) : (
                <p>No turfs available.</p>
              )} */}
              
{isPredicting ? (
  <p
  className="loading-message"
  // Optional - duration for this animation
>
  {predictionMessage}
</p>
  
) : showPredicted && predictedTurfs.length > 0 ? (
  <>
    <h3 className="predicted-title"></h3>
    {predictedTurfs.map((turf) => (
      <div key={turf.id} className="turf-card">
        <img src={turf.image} alt={turf.name} className="turf-image" />
        <div className="turf-details">
          <h3>{turf.name}</h3>
          <p>
            <strong>Location:</strong> {turf.location}
          </p>
          <p>
            <strong>Predicted Rating:</strong> ⭐ {turf.predictedRating.toFixed(2)}
          </p>
          <p>
            <strong>Price per Hour:</strong> ₹{turf.price}
          </p>
      
          <button
            className="book-now"
            onClick={() => handleBooking(turf.location, turf.id1)}
          >
            Book Now
          </button>
        </div>
      </div>
    ))}
  </>
) : filteredTurfs.length > 0 ? (
  <>
    {filteredTurfs.map((turf) => (
      <div key={turf.id} className="turf-card">
        <img src={turf.image} alt={turf.name} className="turf-image" />
        <div className="turf-details">
          <h3>{turf.name}</h3>
          <p>
            <strong>Location:</strong> {turf.location}
          </p>
          <p>
            <strong>Price per Hour:</strong> ₹{turf.price}
          </p>
          <RatingComponent turf={turf} db={db} user={user} /> <span className="rating-count">({Number(turf.totalRatings) || 0} Ratings)</span>
          {/* <div className="search-turf-container">
//                 {filteredTurfs.length > 0 ? (
//                   filteredTurfs.map((turf) => {
//                     const totalRatings = turf.ratings.reduce((sum, count) => sum + count, 0);
//                     return (
//                       <div key={turf.id} className="turf-card">
//                         <img src={turf.image} alt={turf.name} className="turf-image" />
//                         <div className="turf-details">
//                           <h3>{turf.name}</h3>
//                           <p><strong>Location:</strong> {turf.location}</p>
//                           <p><strong>Address:</strong> {turf.address}</p>
//                           <p><strong>Price per hour:</strong> ₹{turf.price}</p>

//                           <div className="turf-rating">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span
//                                 key={star}
//                                 className={star <= totalRatings ? "star filled" : "star"}
//                                 onClick={() => handleRating(turf, star)}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                             <span
//   key={star}
//   className={`star ${turf.userRating && star <= turf.userRating ? "filled" : ""}`}
//   onClick={() => handleRating(turf, star)}
// >
//   ★
// </span><span className="rating-count">({totalRatings} Ratings)</span>


//                           </div> */}
          <button
            className="book-now"
            onClick={() => handleBooking(turf.location, turf.id1)}
          >
            Book Now
          </button>
        </div>
      </div>
    ))}
  </>
) : (
  <p className="no-results-message">❌ No turfs available for the selected filters.</p>
)}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}













// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue, update } from "firebase/database";
// import "./SearchTurf.css";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import StarRating from "../components/StarRating";

// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDBwhqwEl5P48hGqBW47c_jKvnU0hPHsxs",
//   authDomain: "turf-finder-4bfdd.firebaseapp.com",
//   projectId: "turf-finder-4bfdd",
//   storageBucket: "turf-finder-4bfdd.firebasestorage.app",
//   messagingSenderId: "376213126620",
//   appId: "1:376213126620:web:c4114dfc326666a8e5e319",
//   measurementId: "G-JKMG23HYKV",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// export default function SearchTurf() {
//   const { user } = useAuth();
//   const [turfs, setTurfs] = useState([]);
//   const [filteredTurfs, setFilteredTurfs] = useState([]);
//   const [cityFilter, setCityFilter] = useState("");
//   const [turfTypeFilter, setTurfTypeFilter] = useState([]);
//   const [turfVarietyFilter, setTurfVarietyFilter] = useState("");

//   useEffect(() => {
//     const turfRef = ref(db, "Turf");
//     onValue(turfRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const loadedTurfs = [];
//         Object.keys(data).forEach((city) => {
//           Object.keys(data[city]).forEach((turfName) => {
//             const turf = data[city][turfName];
//             console.log("Original Image URL:", turf.image);
//             loadedTurfs.push({
//               id: turfName,
//               name: turf.Turf_name,
//               location: city, // City name from DB
//               address: turf.Address,
//               price: turf["price per hour"],
//               turfType: turf.Turf_type, // Cricket, Football, etc.
//               turfVariety: turf.Turf_Variety, // Natural, Hybrid, Artificial
//               ratings: [
//                 turf.ratings1 || 0,
//                 turf.ratings2 || 0,
//                 turf.ratings3 || 0,
//                 turf.ratings4 || 0,
//                 turf.ratings5 || 0,
//               ],
//               image: turf.image, 
//               userRating: null,
//             });
//           });
//         });
//         if (user) {
//           const userKey = user.email.replace(/\./g, "_");
//           const userRef = ref(db, `users/${userKey}/ratings`);
//           onValue(userRef, (userSnapshot) => {
//             const userRatings = userSnapshot.val();
//             if (userRatings) {
//               loadedTurfs.forEach((turf) => {
//                 if (userRatings[turf.id]) {
//                   turf.userRating = userRatings[turf.id].rating; // Apply stored rating
//                 }
//               });
//             }
//             setTurfs(loadedTurfs);
//             setFilteredTurfs(loadedTurfs);
//           });
//         } else {
//           setTurfs(loadedTurfs);
//           setFilteredTurfs(loadedTurfs);
//         }
//       }
//     });
//   }, [user]);
  
  
//   const handleRating = async (turf, rating) => {
//     if (!user) {
//       alert("Please log in to give feedback!");
//       return;
//     }
  
//     const userKey = user.email.replace(/\./g, "_"); // Firebase-safe email key
//     const userRef = ref(db, `users/${userKey}/ratings/${turf.id}`);
  
//     try {
//       await update(userRef, { rating }); // Store the rating inside the user's data
//       console.log(`Updated rating for ${turf.name} (${turf.id}) to ${rating} stars`);
      
//       // Update local state to reflect the new rating
//       setFilteredTurfs((prevTurfs) =>
//         prevTurfs.map((t) =>
//           t.id === turf.id ? { ...t, userRating: rating } : t
//         )
//       );
//     } catch (error) {
//       console.error("Error updating rating:", error);
//     }
//   };
  

//   const handleFilterChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setTurfTypeFilter([...turfTypeFilter, value]);
//     } else {
//       setTurfTypeFilter(turfTypeFilter.filter((type) => type !== value));
//     }
//   };

//   const applyFilters = () => {
//     let filtered = turfs;

//     if (cityFilter) {
//       filtered = filtered.filter((turf) => turf.location === cityFilter);
//     }

//     if (turfTypeFilter.length > 0) {
//       filtered = filtered.filter((turf) => turfTypeFilter.includes(turf.turfType));
//     }

//     if (turfVarietyFilter) {
//       filtered = filtered.filter((turf) => turf.turfVariety === turfVarietyFilter);
//     }

//     setFilteredTurfs(filtered);
//   };

//   const { handleLogout } = useAuth(); // Get handleLogout from useAuth()
//   const navigate = useNavigate(); // Ensure navigate is defined

//   const logoutAndClearSession = () => {
//     handleLogout(); // Call the logout function from useAuth
//     localStorage.clear(); // Clear all stored user data
//     sessionStorage.clear(); // Ensure session data is also removed
//     navigate("/"); // Redirect to login page
//   };

//   const star = ''; // or any other value
  

//   return (
//     <div>
//       <div className="search-turf-container">
//         <div className="search-turf-container-child">
//           <div className="search-turf-search-engine">
//             <input type="text" className="search-input" placeholder="Search a Turf" />
//             <button className="search-button">🔍 Search</button>
//             {user ? (
//         <div>
//           <p>Email: {user.email}</p>
//           <p>Name: {user.firstName} {user.lastName}</p>
//           <button className="logout-button" onClick={logoutAndClearSession}>
//               Logout
//             </button>
//         </div>
//       ) : (
//         <p>Please log in to continue.</p>
//       )}
//             <div className="search-display-1">
//               <div className="search-display">
//                 <div className="search-filter-container">
//                   <div className="search-filter">
//                     <h3>Filter Data</h3>
//                     <hr />
//                     <label>Select City:</label>
//                     <select className="filter-dropdown" onChange={(e) => setCityFilter(e.target.value)}>
//                       <option value="">-- Select City --</option>
//                       <option value="Mumbai">Mumbai</option>
//                       <option value="Pune">Pune</option>
//                       <option value="Delhi">Delhi</option>
//                       <option value="Bangalore">Bangalore</option>
//                       <option value="Hyderabad">Hyderabad</option>
//                     </select>

//                     <label>Turf Type:</label>
//                     <div className="checkbox-group">
//                       <label>
//                         <input type="checkbox" value="Football" onChange={handleFilterChange} /> Football
//                       </label>
//                       <label>
//                         <input type="checkbox" value="Cricket" onChange={handleFilterChange} /> Cricket
//                       </label>
//                       <label>
//                         <input type="checkbox" value="Tennis" onChange={handleFilterChange} /> Tennis
//                       </label>
//                       <label>
//                         <input type="checkbox" value="Hockey" onChange={handleFilterChange} /> Hockey
//                       </label>
//                     </div>

//                     <label>Select Turf Variety:</label>
//                     <select className="filter-dropdown" onChange={(e) => setTurfVarietyFilter(e.target.value)}>
//                       <option value="">-- Select Turf Variety --</option>
//                       <option value="Artificial">Artificial</option>
//                       <option value="Natural Grass">Natural Grass</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>

//                     <button className="filter-button" onClick={applyFilters}>Apply Filters</button>
//                   </div>
//                 </div>
//               </div>

//               <div className="search-turf-container">
//                 {filteredTurfs.length > 0 ? (
//                   filteredTurfs.map((turf) => {
//                     const totalRatings = turf.ratings.reduce((sum, count) => sum + count, 0);
//                     return (
//                       <div key={turf.id} className="turf-card">
//                         <img src={turf.image} alt={turf.name} className="turf-image" />
//                         <div className="turf-details">
//                           <h3>{turf.name}</h3>
//                           <p><strong>Location:</strong> {turf.location}</p>
//                           <p><strong>Address:</strong> {turf.address}</p>
//                           <p><strong>Price per hour:</strong> ₹{turf.price}</p>

//                           <div className="turf-rating">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span
//                                 key={star}
//                                 className={star <= totalRatings ? "star filled" : "star"}
//                                 onClick={() => handleRating(turf, star)}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                             <span
//   key={star}
//   className={`star ${turf.userRating && star <= turf.userRating ? "filled" : ""}`}
//   onClick={() => handleRating(turf, star)}
// >
//   ★
// </span><span className="rating-count">({totalRatings} Ratings)</span>


//                           </div>

              







//                           <button className="book-now">Book Now</button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="no-results">🚫 No Turf Found</div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from 'react'
// import './SearchTurf.css'
// import member3 from "../assets/3.jpeg";
// import { getDatabase, ref, onValue, update } from "firebase/database";
// import './SearchTurf.css';
// import { firebaseConfig } from "../pages/auth/Firebase";

// const db = getDatabase(firebaseConfig);

// const turfs = [
//   {
//     id: 1,
//     name: "Green Arena Turf",
//     location: "Mumbai",
//     address: "Andheri, Mumbai, Maharashtra",
//     price: 1200,
//     rating: 4,
//     ratingCount: 120,
//     image: member3, // Replace with actual image URL
//   },
//   {
//     id: 2,
//     name: "Turf Paradise",
//     location: "Pune",
//     address: "Shivaji Nagar, Pune, Maharashtra",
//     price: 1000,
//     rating: 5,
//     ratingCount: 85,
//     image: member3,
//   },
// ];

// export default function SearchTurf() {
  
//   return (
//     <div>
//       <div className="container-parent-turf-care"></div>
//       <div class="search-turf-container">
//         <div class="search-turf-container-child">
//           <div class="search-turf-search-engine">
//             <input 
//               type="text" 
//               class="search-input" 
//               placeholder="Search a Turf"
//             />
//             <button class="search-button">
//               🔍 Search
//             </button>
//             <div class="search-filter-container">
//               <div className="search-filter">
//                 <h3>Filter Data</h3>
//                 <hr />
//                 <label>Select City:</label>
//                 <select className="filter-dropdown">
//                   <option value="">-- Select City --</option>
//                   <option value="Mumbai">Mumbai</option>
//                   <option value="Pune">Pune</option>
//                   <option value="Delhi">Delhi</option>
//                   <option value="Bangalore">Bangalore</option>
//                   <option value="Hyderabad">Hyderabad</option>
//                 </select>
//                 <label>Turf Type:</label>
//                 <div className="checkbox-group">
//                   <label>
//                     <input type="checkbox" value="Football" /> Football
//                   </label>
//                   <label>
//                     <input type="checkbox" value="Cricket" /> Cricket
//                   </label>
//                   <label>
//                     <input type="checkbox" value="Tennis" /> Tennis
//                   </label>
//                   <label>
//                     <input type="checkbox" value="Hockey" /> Hockey
//                   </label>
//                 </div>

//                 {/* Turf Variety - Dropdown */}
//                 <label>Select Turf Variety:</label>
//                 <select className="filter-dropdown">
//                   <option value="">-- Select Turf Variety --</option>
//                   <option value="Artificial">Artificial</option>
//                   <option value="Natural Grass">Natural Grass</option>
//                   <option value="Hybrid">Hybrid</option>
//                 </select>

//                 {/* Search Button */}
//                 <button className="filter-button">Apply Filters</button>
//               </div>
//               {/* <div className="search-turf-card">
      
//     </div> */}

// <div className="search-turf-card-container">
//             {turfs.map((turf) => (
//               <div key={turf.id} className="search-turf-card">
//                 {/* Turf Image */}
//                 <img src={turf.image} alt={turf.name} className="turf-image" />

//                 {/* Turf Details */}
//                 <div className="turf-details">
//                   <h3>{turf.name}</h3>
//                   <p><strong>Location:</strong> {turf.location}</p>
//                   <p><strong>Address:</strong> {turf.address}</p>
//                   <p><strong>Price per hour:</strong> ₹{turf.price}</p>

//                   {/* Rating Section */}
//                   <div className="turf-rating">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <span key={i} className={i < turf.rating ? "star filled" : "star"}>★</span>
//                     ))}
//                     <span className="rating-count">({turf.ratingCount} Ratings)</span>
//                   </div>

//                   {/* Book Now Button */}
//                   <button className="book-now">Book Now</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
