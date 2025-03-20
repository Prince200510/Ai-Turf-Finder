// Import Firebase
import { database } from "./Firebase.js";
import { ref, update } from "firebase/database";

// 🔥 Helper Functions for Random Data
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ⚡ Separate Turf Data Arrays for Each City
const cityTurfData = {
  Mumbai: {
    turfNames: [
      "Green Arena", "Skyline Turf", "Dream Sports", "Victory Arena",
      "Legends Turf", "Elite Sports Ground", "Urban Play", "Grand Turf",
      "Fusion Turf", "Turbo Arena", "Astro Arena", "Prime Sports Hub",
      "Galaxy Turf", "NextGen Turf", "Mumbai Pro Turf"
    ],
    addresses: [
      "Near Andheri Sports Complex", "Goregaon East", "Powai",
      "Bandra West", "Lower Parel", "Malad West", "Borivali East",
      "Dadar", "Juhu", "Thane", "Vashi", "Kandivali West",
      "Mira Road", "Chembur", "Worli"
    ],
    contactNumbers: [
      "9823456789", "9765432100", "9988776655", "9876543210", "9123456789",
      "9254678901", "9456781234", "9000000001", "9988001122", "9812345678",
      "9098765432", "9301122334", "9509876543", "9822109876", "9654321987"
    ]
  },
  Pune: {
    turfNames: [
      "Pune Play Arena", "Sky Sports Pune", "Victory Play Ground",
      "Mega Sports Hub", "Prime Turf Pune", "Fusion Arena",
      "SportsNation Pune", "Olympia Turf", "Turbo Play Ground",
      "Elite Play Hub", "Urban Kick Turf", "Galaxy Play Pune",
      "AllStar Arena", "NextGen Play Turf", "Pune Sports Zone"
    ],
    addresses: [
      "Koregaon Park", "Baner", "Hinjewadi", "Shivaji Nagar",
      "Katraj", "Magarpatta City", "Hadapsar", "Pashan",
      "FC Road", "Viman Nagar", "Wakad", "Sinhagad Road",
      "Aundh", "Kalyani Nagar", "Karve Nagar"
    ],
    contactNumbers: [
      "9876009876", "8765098765", "9123456000", "9988771122", "9321123344",
      "9198765432", "9887654321", "9753124680", "9001234567", "9654123000",
      "9523678901", "9898989898", "9090909090", "9400123456", "9301122444"
    ]
  },
  Bangalore: {
    turfNames: [
      "Royal Play Arena", "Sky Sports Bangalore", "Urban Kick Arena",
      "Ace Turf Hub", "Victory Sports Zone", "Mega Sports Arena",
      "AllStar Play Ground", "Olympia Sports Hub", "Bangalore Pro Turf",
      "Elite Sports Zone", "Fusion Play Ground", "Galaxy Play Turf",
      "Turf Nation", "Prime Sports Zone", "NextGen Play Arena"
    ],
    addresses: [
      "MG Road", "Koramangala", "Indiranagar", "Whitefield",
      "Hebbal", "Marathahalli", "Jayanagar", "HSR Layout",
      "Electronic City", "Banashankari", "Malleswaram",
      "Yelahanka", "Kengeri", "Rajajinagar", "Sarjapur Road"
    ],
    contactNumbers: [
      "9900112233", "9988997766", "9321456789", "9765123400", "9632587410",
      "9876543333", "9854123698", "9551122334", "9445566778", "9008887776",
      "9156781234", "9887766554", "9654321098", "9500001111", "9309876543"
    ]
  },
  Hyderabad: {
    turfNames: [
      "Hyderabad Kick Arena", "Fusion Sports Hub", "Astro Turf Hyderabad",
      "Victory Arena Hyderabad", "Sky Sports City", "Elite Sports Ground",
      "Turf Master Hyderabad", "Prime Play Zone", "Galaxy Kick Hub",
      "Urban Play Ground", "NextGen Sports Arena", "Dream Sports Hub",
      "Olympia Arena Hyderabad", "AllStar Turf", "Turbo Play Hyderabad"
    ],
    addresses: [
      "Banjara Hills", "Hitech City", "Gachibowli", "Kondapur",
      "Begumpet", "Secunderabad", "Madhapur", "Attapur",
      "Jubilee Hills", "Kukatpally", "LB Nagar", "Shamshabad",
      "Miyapur", "Charminar", "Nampally"
    ],
    contactNumbers: [
      "9012345678", "9956784321", "9876567890", "9123456798", "9333445566",
      "9445566778", "9500011223", "9786543210", "9567894321", "9990011223",
      "9123456789", "9556677889", "9087654321", "9678899000", "9881122334"
    ]
  },
  Delhi: {
    turfNames: [
      "Delhi Sports Arena", "Skyline Turf Delhi", "Fusion Play Zone",
      "Victory Sports Hub", "Prime Sports Delhi", "AllStar Arena",
      "Urban Play Ground", "Galaxy Sports Turf", "Elite Sports Ground",
      "Turf Master Delhi", "Olympia Play Arena", "Turbo Kick Delhi",
      "Astro Arena Delhi", "NextGen Sports Hub", "Dream Sports Delhi"
    ],
    addresses: [
      "Connaught Place", "Karol Bagh", "Saket", "Vasant Kunj",
      "Lajpat Nagar", "Rajouri Garden", "Dwarka", "Janakpuri",
      "Chanakyapuri", "Rohini", "Pitampura", "Greater Kailash",
      "Kalkaji", "Green Park", "Hauz Khas"
    ],
    contactNumbers: [
      "9311122233", "9876543210", "9656784321", "9445566778", "9567894321",
      "9123456798", "9333445566", "9556677889", "9990011223", "9500011223",
      "9123456789", "9678899000", "9087654321", "9881122334", "9012345678"
    ]
  },
  Chennai: {
    turfNames: [
      "Chennai Pro Arena", "Victory Turf Chennai", "Sky Play Ground",
      "Elite Sports Hub", "Fusion Kick Chennai", "AllStar Turf",
      "Prime Play Arena", "Astro Sports Zone", "Olympia Turf Chennai",
      "Galaxy Sports Ground", "Turf Nation Chennai", "Dream Sports Arena",
      "Urban Play Zone", "Turbo Kick Ground", "NextGen Play Chennai"
    ],
    addresses: [
      "Adyar", "T Nagar", "Anna Nagar", "Nungambakkam",
      "Velachery", "Alwarpet", "Porur", "Guindy",
      "OMR", "Perungudi", "Kilpauk", "Mylapore",
      "Thoraipakkam", "Tambaram", "Kodambakkam"
    ],
    contactNumbers: [
      "9123456789", "9556677889", "9311122233", "9876543210", "9990011223",
      "9500011223", "9087654321", "9678899000", "9881122334", "9567894321",
      "9445566778", "9333445566", "9123456798", "9656784321", "9012345678"
    ]
  }
};

// 📅 Generate Random Bookings (10 Random Bookings Per Turf)
const generateRandomBookings = () => {
  const bookings = {};
  for (let i = 0; i < 10; i++) {
    const date = `2025-03-${getRandomNumber(10, 30)}`;
    bookings[date] = {};
    const startHour = getRandomNumber(7, 20); // Between 7 AM - 8 PM
    const duration = getRandomNumber(1, 2); // 1 to 2 hours slots
    const endHour = startHour + duration;
    const slot = `${startHour < 10 ? "0" + startHour : startHour}:00 to ${
      endHour < 10 ? "0" + endHour : endHour
    }:00`;
    bookings[date][slot] = {
      mobile_no: getRandomNumber(7000000000, 9999999999).toString(),
      name: `User${getRandomNumber(1, 100)}`,
    };
  }
  return bookings;
};

// 🔥 Generate Unique Turf Data for a City
const generateTurfDataForCity = (city) => {
  const { turfNames, addresses, contactNumbers } = cityTurfData[city];
  const turfData = {};
  const usedNames = new Set(); // To store unique names

  for (let i = 0; i < 15; i++) {
    let turfName;
    do {
      turfName = getRandomElement(turfNames); // Use city-specific names
    } while (usedNames.has(turfName)); // Ensure uniqueness
    usedNames.add(turfName);

    turfData[turfName] = {
      Address: getRandomElement(addresses) + ", " + city,
      Contact_Number: getRandomElement(contactNumbers),
      Turf_Variety: getRandomElement(["Artificial", "Hybrid", "Natural Grass"]),
      Turf_name: turfName,
      Turf_type: getRandomElement(["Cricket", "Football", "Badminton", "Tennis"]),
      booking: generateRandomBookings(),
      id: getRandomNumber(1000, 9999),
      image: "https://i.postimg.cc/mZ6rvxxV/4.jpg",
      location: city,
      "price per hour": getRandomNumber(800, 2000),
      ratings1: getRandomNumber(5, 15),
      ratings2: getRandomNumber(10, 25),
      ratings3: getRandomNumber(20, 40),
      ratings4: getRandomNumber(30, 50),
      ratings5: getRandomNumber(50, 100),
    };
  }
  return turfData;
};

// 🎉 Generate Turf Data for All Cities
const turfData = {
  Turf: {
    Mumbai: generateTurfDataForCity("Mumbai"),
    Pune: generateTurfDataForCity("Pune"),
    Bangalore: generateTurfDataForCity("Bangalore"),
    Hyderabad: generateTurfDataForCity("Hyderabad"),
    Delhi: generateTurfDataForCity("Delhi"),
    Chennai: generateTurfDataForCity("Chennai"),
  }
};

// 🔥 Push Turf Data to Firebase
const pushTurfData = async () => {
  try {
    const turfRef = ref(database, "/Turf1");
    await update(turfRef, turfData.Turf);
    console.log("✅ Turf Data Pushed Successfully!");
  } catch (error) {
    console.error("❌ Error pushing turf data:", error);
  }
};

// 🚀 Push the Turf Data
pushTurfData();
