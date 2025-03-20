import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const StarRating = ({ turfId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleRating = async (selectedRating) => {
    setRating(selectedRating);

    // Example: Update rating in Firebase or your backend
    const updatedRatings = {
      id: turfId,
      rating: selectedRating,
    };

    // Replace this with your actual API call
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Swal.fire("Success!", "Your rating has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update rating.", "error");
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <FaStar
            key={index}
            size={30}
            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRating(starValue)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
