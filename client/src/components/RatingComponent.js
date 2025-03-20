// import React from "react";
// import { update, ref } from "firebase/database";
// import { FaStar } from "react-icons/fa";

// const RatingComponent = ({ turf, db, user }) => {
//     // const handleRating = async (rating) => {
//     //     if (!user) {
//     //       alert("Please log in to rate!");
//     //       return;
//     //     }
      
//     //     const userKey = user.email.replace(/\./g, "_");
      
//     //     // Reference to the ratings field for the selected turf
//     //     const ratingRef = ref(db, `Turf/${turf.location}/${turf.id}`);
      
//     //     // Correctly update the selected rating field
//     //     const updatedRating = { [`ratings${rating}`]: (turf.ratings[rating - 1] || 0) + 1 };
      
//     //     await update(ratingRef, updatedRating);
      
//     //     alert(`Rated ${rating} stars!`);
//     //   };
//     const handleRating = async (newRating) => {
//         if (!user) {
//           alert("Please log in to rate!");
//           return;
//         }
      
//         const userKey = user.email.replace(/\./g, "_");
//         const userRef = ref(db, `users/${userKey}/ratings/${turf.id}`);
//         const turfRef = ref(db, `Turf/${turf.location}/${turf.id}`);
      
//         if (turf.userRating) {
//           // User already rated before, so decrement the old rating
//           const oldRatingField = `ratings${turf.userRating}`;
//           const newRatingField = `ratings${newRating}`;
      
//           const updates = {
//             [oldRatingField]: Math.max((turf.ratings[turf.userRating - 1] || 1) - 1, 0), // Decrease old rating
//             [newRatingField]: (turf.ratings[newRating - 1] || 0) + 1, // Increase new rating
//           };
      
//           await update(turfRef, updates);
//         } else {
//           // First-time rating, just increment the selected rating
//           const ratingField = `ratings${newRating}`;
//           const updates = { [ratingField]: (turf.ratings[newRating - 1] || 0) + 1 };
//           await update(turfRef, updates);
//         }
      
//         // Store user's rating
//         await update(userRef, { rating: newRating });
      
//         alert(`You rated ${newRating} stars!`);
//       };
      

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <FaStar key={star} onClick={() => handleRating(star)} />
//       ))}
//     </div>
//   );
// };

// export default RatingComponent;



import React, { useState, useEffect } from "react";
import { update, ref, onValue } from "firebase/database";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const RatingComponent = ({ turf, db, user }) => {
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    if (!user) return;

    // const userKey = user.email.replace(/\./g, "_");
    const userKey = user?.email ? user.email.replace(/\./g, "_") : "";
    const userRef = ref(db, `users/${userKey}/ratings/${turf.id}`);

    // Fetch and set the user's rating
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.rating) {
        setUserRating(data.rating);
      }
    });
  }, [user, turf.id, db]);

  // const handleRating = async (newRating) => {
  //   if (!user) {
  //     // alert("Please log in to rate!");
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Oops...",
  //       text: "Please log in to rate!",
  //       confirmButtonColor: "#ff4b5c",
  //     });
  //     return;
  //   }
  
  //   const userKey = email ? user.email.replace(/\./g, "_") : "";
  //   const userRef = ref(db, `users/${userKey}/ratings/${turf.name}`); // Using turf.name instead of ID
  //   const turfRef = ref(db, `Turf/${turf.location}/${turf.name}`); // Corrected reference
  
  //   if (userRating) {
  //     // User already rated before, decrement old rating and increment new rating
  //     const oldRatingField = `ratings${userRating}`;
  //     const newRatingField = `ratings${newRating}`;
  
  //     const updates = {
  //       [oldRatingField]: Math.max((turf.ratings[userRating - 1] || 1) - 1, 0),
  //       [newRatingField]: (turf.ratings[newRating - 1] || 0) + 1,
  //     };
  
  //     await update(turfRef, updates);
  //   } else {
  //     // First-time rating, just increment the selected rating
  //     const ratingField = `ratings${newRating}`;
  //     const updates = { [ratingField]: (turf.ratings[newRating - 1] || 0) + 1 };
  //     await update(turfRef, updates);
  //   }
  
  //   // Store user's rating
  //   await update(userRef, { rating: newRating });
  //   setUserRating(newRating);
  //   // alert(`You rated ${newRating} stars!`);
  //   Swal.fire({
  //     icon: "success",
  //     title: "Thank You! ❤️",
  //     text: `You rated ${newRating} stars!`,
  //     confirmButtonColor: "#ff4b5c",
  //   });
  // };

  const handleRating = async (newRating) => {
    if (!user || !user.email) { // Check if user and user.email exist
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please log in to rate!",
        confirmButtonColor: "#ff4b5c",
      });
      return;
    }
  
    const userKey = user.email.replace(/\./g, "_"); // Now this is safe to call
    const userRef = ref(db, `users/${userKey}/ratings/${turf.name}`);
    const turfRef = ref(db, `Turf/${turf.location}/${turf.name}`);
  
    if (userRating) {
      const oldRatingField = `ratings${userRating}`;
      const newRatingField = `ratings${newRating}`;
  
      const updates = {
        [oldRatingField]: Math.max((turf.ratings?.[userRating - 1] || 1) - 1, 0),
        [newRatingField]: (turf.ratings?.[newRating - 1] || 0) + 1,
      };
  
      await update(turfRef, updates);
    } else {
      const ratingField = `ratings${newRating}`;
      const updates = { [ratingField]: (turf.ratings?.[newRating - 1] || 0) + 1 };
      await update(turfRef, updates);
    }
  
    await update(userRef, { rating: newRating });
    setUserRating(newRating);
  
    Swal.fire({
      icon: "success",
      title: "Thank You! ❤️",
      text: `You rated ${newRating} stars!`,
      confirmButtonColor: "#ff4b5c",
    });
  };
  
  
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => handleRating(star)}
          style={{ color: star <= userRating ? "gold" : "gray", cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default RatingComponent;
