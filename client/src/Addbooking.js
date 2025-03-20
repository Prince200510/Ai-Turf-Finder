import { getDatabase, ref, push } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const addBooking = () => {
  const bookingRef = ref(database, "Turf/Mumbai/Green Arena Turf/booking");

  const newBooking = {
    id: 1002,
    image: "https://i.postimg.cc/mZ6rvxxV/4.jpg",
    location: "Mumbai",
    price_per_hour: 1500,
    ratings1: 5,
    ratings2: 20,
    ratings3: 10,
    ratings4: 45,
    ratings5: 90,
  };

  push(bookingRef, newBooking)
    .then(() => {
      console.log("Booking added successfully!");
    })
    .catch((error) => {
      console.error("Error adding booking:", error);
    });
};

export default addBooking;


