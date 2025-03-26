// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { database } from "../auth/Firebase";
// import { ref, get, set } from "firebase/database";
// import Swal from "sweetalert2";
// import "./Booking.css";

// const Booking = () => {
//   const { city, turfId } = useParams();
//   const decodedCity = decodeURIComponent(city);
//   const decodedTurfId = decodeURIComponent(turfId);

//   const [turf, setTurf] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobile: "",
//     peopleCount: "",
//     coachNeeded: "No",
//     suggestion: "",
//     hours: "1",
//     slot: "",
//   });

//   useEffect(() => {
//     const fetchTurfDetails = async () => {
//       try {
//         const turfsRef = ref(database, `Turf/${decodedCity}`);
//         const snapshot = await get(turfsRef);

//         if (snapshot.exists()) {
//           const turfsData = snapshot.val();
//           const selectedTurf = Object.values(turfsData).find(
//             (turf) => turf.id == decodedTurfId
//           );
//           if (selectedTurf) {
//             setTurf(selectedTurf);

//             // Fetch booked slots
//             const bookedData = selectedTurf.booking || {};
//             setBookedSlots(Object.keys(bookedData));
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching turf details:", error);
//       }
//     };
//     fetchTurfDetails();
//   }, [decodedCity, decodedTurfId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const checkSlotConflict = (newSlot) => {
//     const [newStart, newEnd] = newSlot.split(" to ").map((time) => parseInt(time.split(":")[0]));
  
//     for (let bookedSlot of bookedSlots) {
//       const [bookedStart, bookedEnd] = bookedSlot
//         .split(" to ")
//         .map((time) => parseInt(time.split(":")[0]));
  
//       // 🔥 Check for slot overlap
//       if (
//         (newStart >= bookedStart && newStart < bookedEnd) || // New start is within booked slot
//         (newEnd > bookedStart && newEnd <= bookedEnd) || // New end is within booked slot
//         (newStart <= bookedStart && newEnd >= bookedEnd) // New slot completely overlaps
//       ) {
//         return true; // Conflict detected
//       }
//     }
//     return false; // No conflict
//   };
  
  
//   const handleBooking = async () => {
//     if (!formData.slot) {
//       Swal.fire("Please select a valid slot!", "", "error");
//       return;
//     }
  
//     // 🚨 Check for slot conflicts before booking
//     if (checkSlotConflict(formData.slot)) {
//       Swal.fire(
//         "Slot Conflict!",
//         "The selected time slot overlaps with an already booked slot. Please choose another slot.",
//         "error"
//       );
//       return;
//     }
  
//     const bookingPath = `Turf/${decodedCity}/${turf.Turf_name}/booking/${formData.selectedDay}/${formData.slot}`;
//     const bookingData = {
//       name: formData.fullName,
//       mobile_no: formData.mobile,
//     };
  
//     try {
//       await set(ref(database, bookingPath), bookingData);
//       Swal.fire("Booking Confirmed!", "Your slot has been booked.", "success");
  
//       // ✅ Add newly booked slot to bookedSlots to update the dropdown dynamically
//       setBookedSlots([...bookedSlots, formData.slot]);
//     } catch (error) {
//       Swal.fire("Error!", "Something went wrong. Try again later.", "error");
//     }
//   };
  

//   const generateSlots = () => {
//     const slots = [];
//     let startHour = 7; // Start at 7:00 AM
//     let endHour = 24; // End at 12:00 AM
//     let bookingHours = parseInt(formData.hours);
  
//     for (let i = startHour; i + bookingHours <= endHour; i += bookingHours) {
//       let start = `${i < 10 ? "0" + i : i}:00`;
//       let end = `${i + bookingHours < 10 ? "0" + (i + bookingHours) : i + bookingHours}:00`;
//       let slot = `${start} to ${end}`;
  
//       // 🔥 Hide slots that have conflicts
//       if (!checkSlotConflict(slot)) {
//         slots.push(slot);
//       }
//     }
//     return slots;
//   };
  

//   if (!turf) return <p>Loading...</p>;

//   return (
//     <>
//       <div className="booking-turf-container">
//         <div className="booking-container">
//           <div className="turf-details-booking">
//             <div className="turf-details-card">
//               <img src={turf.image} alt={turf.Turf_name} className="turf-image" />
//               <h2>{turf.Turf_name}</h2>
//               <hr />
//               <p>
//                 <strong>Type:</strong> {turf.Turf_type}
//               </p>
//               <p>
//                 <strong>Location:</strong> {turf.Address}
//               </p>
//               <p>
//                 <strong>Price per hour:</strong> ₹{turf["price per hour"]}
//               </p>
//               <hr />
//               <h3>Ratings</h3>
//               <ul>
//                 <li>⭐⭐⭐⭐⭐ - {turf.ratings5} people</li>
//                 <li>⭐⭐⭐⭐ - {turf.ratings4} people</li>
//                 <li>⭐⭐⭐ - {turf.ratings3} people</li>
//                 <li>⭐⭐ - {turf.ratings2} people</li>
//                 <li>⭐ - {turf.ratings1} people</li>
//               </ul>
//             </div>
//           </div>

//           <div className="booking-form">
//             <h2>Book Now</h2>

//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//             <input
//               type="tel"
//               name="mobile"
//               placeholder="Mobile Number"
//               value={formData.mobile}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               name="peopleCount"
//               placeholder="Number of People"
//               value={formData.peopleCount}
//               onChange={handleChange}
//               min="1"
//             />
//             <select name="coachNeeded" value={formData.coachNeeded} onChange={handleChange}>
//               <option value="No">No Coach</option>
//               <option value="Yes">Personal Coach</option>
//             </select>

//             {/* Select Number of Hours */}
//             <div className="input-group">
//               <select name="hours" value={formData.hours} onChange={handleChange}>
//                 {[...Array(6)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1} Hour(s)
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="input-group">
//               <select name="slot" value={formData.slot} onChange={handleChange}>
//                 {generateSlots().map((slot, index) => (
//                   <option key={index} value={slot}>
//                     {slot}
//                   </option>
//                 ))}
//               </select>
              
        
//   <label className="no-slot-message">
//     If there is no time slot showing, it means the turf has been fully booked by another person.
//   </label>


//             </div>

//             <textarea
//               name="suggestion"
//               placeholder="Any Suggestions"
//               value={formData.suggestion}
//               onChange={handleChange}
//             ></textarea>
//             <br />
//             <button className="confirm-btn" onClick={handleBooking}>
//               Confirm Booking
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Booking;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { database } from "../auth/Firebase";
import { ref, get, set } from "firebase/database";
import Swal from "sweetalert2";
import "./Booking.css";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

const Booking = () => {
  const { city, turfId } = useParams();
  const decodedCity = decodeURIComponent(city);
  const decodedTurfId = decodeURIComponent(turfId);

  const [turf, setTurf] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    peopleCount: "",
    coachNeeded: "No",
    suggestion: "",
    hours: "1",
    slot: "",
    selectedDate: "", 
  });

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        // const turfsRef = ref(database, `Turf/${decodedCity}`);
        const turfsRef = ref(database, `Turf1/${decodedCity}`);
        const snapshot = await get(turfsRef);

        if (snapshot.exists()) {
          const turfsData = snapshot.val();
          const selectedTurf = Object.values(turfsData).find(
            (turf) => turf.id == decodedTurfId
          );

          if (selectedTurf) {
            setTurf(selectedTurf);
            const bookedData = selectedTurf.booking || {};
            setBookedSlots(bookedData);
          }
        }
      } catch (error) {
        console.error("Error fetching turf details:", error);
      }
    };
    fetchTurfDetails();
  }, [decodedCity, decodedTurfId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const checkSlotConflict = (newSlot) => {
  if (!formData.selectedDate) return false;

  const selectedDateSlots = bookedSlots[formData.selectedDate] || {};
  const [newStart, newEnd] = newSlot
    .split(" to ")
    .map((time) => parseInt(time.split(":")[0]));

  for (let bookedSlot of Object.keys(selectedDateSlots)) {
    const [bookedStart, bookedEnd] = bookedSlot
      .split(" to ")
      .map((time) => parseInt(time.split(":")[0]));

    if (
      (newStart >= bookedStart && newStart < bookedEnd) || 
      (newEnd > bookedStart && newEnd <= bookedEnd) || 
      (newStart <= bookedStart && newEnd >= bookedEnd) 
    ) {
      return true; 
    }
  }
  return false; 
};

  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      let day = nextDate.toLocaleDateString("en-US", { weekday: "long" });
      let date = nextDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      dates.push({ label: `${day} - ${date}`, value: date });
    }

    return dates;
  };
  const generateSlots = () => {
    const slots = [];
    let startHour = 7; 
    let endHour = 24; 
    let bookingHours = parseInt(formData.hours);

    for (let i = startHour; i + bookingHours <= endHour; i += bookingHours) {
      let start = `${i < 10 ? "0" + i : i}:00`;
      let end = `${i + bookingHours < 10 ? "0" + (i + bookingHours) : i + bookingHours}:00`;
      let slot = `${start} to ${end}`;

      if (!checkSlotConflict(slot)) {
        slots.push(slot);
      }
    }
    return slots;
  };

  const handleBooking = async () => {
    if (!formData.slot || !formData.selectedDate) {
      Swal.fire("Please select a valid date and slot!", "", "error");
      return;
    }
  
    if (checkSlotConflict(formData.slot)) {
      Swal.fire(
        "Slot Conflict!",
        "The selected time slot is already booked. Please choose another slot.",
        "error"
      );
      return;
    }
  
    const bookingPath = `Turf1/${decodedCity}/${turf.Turf_name}/booking/${formData.selectedDate}/${formData.slot}`;
    const bookingData = {
      name: formData.fullName,
      mobile_no: formData.mobile,
      hours: formData.hours,
    };
  
    try {
      await set(ref(database, bookingPath), bookingData);
      Swal.fire("Booking Confirmed!", "Your slot has been booked.", "success");
      setBookedSlots((prev) => ({
        ...prev,
        [formData.selectedDate]: {
          ...(prev[formData.selectedDate] || {}),
          [formData.slot]: bookingData,
        },
      }));
      generateInvoicePDF();
  
      setFormData({ ...formData, slot: "" });
    } catch (error) {
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
      console.log(error);
    }
  };
  
  // const handleBooking = async () => {
  //   if (!formData.slot || !formData.selectedDate) {
  //     Swal.fire("Please select a valid date and slot!", "", "error");
  //     return;
  //   }

  //   // Check if slot is already booked
  //   if (checkSlotConflict(formData.slot)) {
  //     Swal.fire(
  //       "Slot Conflict!",
  //       "The selected time slot is already booked. Please choose another slot.",
  //       "error"
  //     );
  //     return;
  //   }

  //   // const bookingPath = `Turf/${decodedCity}/${turf.Turf_name}/booking/${formData.selectedDate}/${formData.slot}`;
    
  //   const bookingPath = `Turf1/${decodedCity}/${turf.Turf_name}/booking/${formData.selectedDate}/${formData.slot}`;
  //   const bookingData = {
  //     name: formData.fullName,
  //     mobile_no: formData.mobile,
  //     hours: formData.hours, // ✅ Include number of hours in booking data
  //   };

  //   try {
  //     await set(ref(database, bookingPath), bookingData);
  //     Swal.fire("Booking Confirmed!", "Your slot has been booked.", "success");

  //     // ✅ Update bookedSlots immediately after booking
  //     setBookedSlots((prev) => ({
  //       ...prev,
  //       [formData.selectedDate]: {
  //         ...(prev[formData.selectedDate] || {}),
  //         [formData.slot]: bookingData,
  //       },
  //     }));

  //     setFormData({ ...formData, slot: "" });
  //   } catch (error) {
  //     Swal.fire("Error!", "Something went wrong. Try again later.", "error");
  //   }
  // };

  if (!turf) return <p>Loading...</p>;
  const generateInvoicePDF = () => {
    try {
      const doc = new jsPDF();
      const primaryColor = [44, 62, 80]; 
      const accentColor = [26, 188, 156];
      const borderColor = [200, 200, 200]; 

      if (turf.image) {
        doc.addImage(turf.image, "JPEG", 15, 10, 40, 30);
      }
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("BOOKING INVOICE", 105, 25, { align: "center" });
      let yPosition = 50;
      drawSectionHeader(doc, "Booking Details", yPosition);
      yPosition += 12;
  
      const details = [
        ["Turf Name:", turf.Turf_name || "N/A"],
        ["Location:", turf.Address || "N/A"],
        ["Date:", formData.selectedDate || "N/A"],
        ["Slot:", formData.slot || "N/A"],
        ["Hours:", `${formData.hours || 0} Hour(s)`],
        ["Coach Needed:", formData.coachNeeded || "No"],
      ];
      yPosition = drawSectionDetails(doc, details, yPosition);

      yPosition += 5;
      drawSectionHeader(doc, "User Details", yPosition);
      yPosition += 12;
  
      const userDetails = [
        ["Name:", formData.fullName || "N/A"],
        ["Mobile:", formData.mobile || "N/A"],
        ["People Count:", formData.peopleCount || "0"],
        ["Suggestions:", formData.suggestion || "None"],
      ];
      yPosition = drawSectionDetails(doc, userDetails, yPosition);
      yPosition += 5;
      drawSectionHeader(doc, "Payment Summary", yPosition);
      yPosition += 12;
  
      const pricePerHour = parseInt(turf["price per hour"]) || 0;
      const totalAmount = pricePerHour * (parseInt(formData.hours) || 0);
  
      const paymentDetails = [
        ["Rate per Hour:", `${pricePerHour.toLocaleString("en-IN")}`],
        ["Total Hours:", formData.hours || "0"],
        ["Total Amount:", `${totalAmount.toLocaleString("en-IN")}`],
      ];
      yPosition = drawSectionDetails(doc, paymentDetails, yPosition);
     
      yPosition += 10;
      drawSectionHeader(doc, "Rules & Guidelines", yPosition);
      yPosition += 12;
  
      const rules = [
        "Payment should be made offline before the match.",
        "If you fail to show up after booking, you will be marked as blacklisted.",
        "Once blacklisted, you will not be able to book any turf in India.",
        "Cancellations should be done at least 24 hours before the booking time.",
        "Maintain discipline and avoid any misconduct on the turf premises.",
      ];

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...primaryColor);
  
      rules.forEach((rule, index) => {
        doc.text(`${index + 1}. ${rule}`, 15, yPosition);
        yPosition += 7;
      });
      yPosition += 10;
      doc.setDrawColor(...borderColor);
      doc.setLineWidth(0.5);
      doc.line(15, yPosition, 195, yPosition);
  
      doc.setFontSize(10);
      doc.setTextColor(...primaryColor);
      doc.text("Thank you for choosing our turf! Enjoy your game!", 105, yPosition + 10, {
        align: "center",
      });
      doc.save(`Booking_Invoice_${formData.fullName || "User"}_${formData.selectedDate || "Date"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire("Error!", "Unable to generate the invoice. Please try again.", "error");
    }
  };
  
  const drawSectionHeader = (doc, title, yPosition) => {
    doc.setFontSize(14);
    doc.setTextColor(26, 188, 156); // Teal
    doc.setFont("helvetica", "bold");
    doc.text(title, 15, yPosition);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(15, yPosition + 2, 195, yPosition + 2);
  };
  
  const drawSectionDetails = (doc, details, yPosition) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(44, 62, 80); 
  
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 15, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), 60, yPosition);
      yPosition += 8;
    });
  
    return yPosition + 5;
  };
  
  return (
    <div className="booking-turf-container">
      <div className="booking-container">
      <div className="turf-details-booking">
          <div className="turf-details-card">
            <img src={turf.image} alt={turf.Turf_name} className="turf-image" />
            <h2>{turf.Turf_name}</h2>
            <hr />
            <p>
              <strong>Type:</strong> {turf.Turf_type}
            </p>
            <p>
              <strong>Location:</strong> {turf.Address}
            </p>
            <p>
              <strong>Price per hour:</strong> ₹{turf["price per hour"]}
            </p>
            <p>
              <strong>Contact No:</strong> {turf.Contact_Number}
            </p>
            <hr />
            <h3>Ratings</h3>
            <ul>
              <li>⭐⭐⭐⭐⭐ - {turf.ratings5} people</li>
              <li>⭐⭐⭐⭐ - {turf.ratings4} people</li>
              <li>⭐⭐⭐ - {turf.ratings3} people</li>
              <li>⭐⭐ - {turf.ratings2} people</li>
              <li>⭐ - {turf.ratings1} people</li>
            </ul>
          </div>
        </div>

        <div className="booking-form">
          <h2>Book Now</h2>

          <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            <input
              type="number"
              name="peopleCount"
              placeholder="Number of People"
              value={formData.peopleCount}
              onChange={handleChange}
              min="1"
            />
            <select name="coachNeeded" value={formData.coachNeeded} onChange={handleChange}>
              <option value="No">No Coach</option>
              <option value="Yes">Personal Coach</option>
            </select>

          {/* Select Date */}
          <div className="input-group">
            <select
              name="selectedDate"
              value={formData.selectedDate}
              onChange={handleChange}
            >
              <option value="">Select Date</option>
              {generateDates().map((date, index) => (
                <option key={index} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <select
              name="hours"
              value={formData.hours}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map((hour) => (
                <option key={hour} value={hour}>
                  {hour} Hour(s)
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <select
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              disabled={!formData.selectedDate}
            >
              <option value="">Select Slot</option>
              {generateSlots().map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <label className="no-slot-message">If there is no time slot showing, it means the turf has been booked by another person.</label>
            <textarea
              name="suggestion"
              placeholder="Any Suggestions"
              value={formData.suggestion}
              onChange={handleChange}
            ></textarea>
            <br />
          <button className="confirm-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
