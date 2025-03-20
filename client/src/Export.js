// Import Required Modules
import { database } from "./Firebase.js";
import { ref, get } from "firebase/database";
import XLSX from "xlsx";

// 🔥 Function to Fetch Data from Firebase and Export to Excel
const fetchAndExportTurfData = async () => {
  try {
    console.log("📡 Fetching Turf1 Data...");
    const turfRef = ref(database, "/Turf1"); // Path to Turf1
    const snapshot = await get(turfRef);

    if (!snapshot.exists()) {
      console.log("❌ No data found in Turf1.");
      return;
    }

    const turfData = snapshot.val();
    const citiesOrder = ["Mumbai", "Delhi", "Pune", "Bangalore", "Hyderabad", "Chennai"];
    const allData = [];

    // 📚 Iterate through Cities in Priority Order
    citiesOrder.forEach((city) => {
      if (turfData[city]) {
        Object.keys(turfData[city]).forEach((turfName) => {
          const turf = turfData[city][turfName];

          // Push Turf Data into Rows
          allData.push({
            City: city,
            Turf_Name: turf.Turf_name,
            Address: turf.Address,
            Contact_Number: turf.Contact_Number || "N/A",
            Turf_Variety: turf.Turf_Variety,
            Turf_Type: turf.Turf_type,
            Price_Per_Hour: turf["price per hour"],
            Ratings_1_Star: turf.ratings1,
            Ratings_2_Star: turf.ratings2,
            Ratings_3_Star: turf.ratings3,
            Ratings_4_Star: turf.ratings4,
            Ratings_5_Star: turf.ratings5,
            Booking_Count: Object.keys(turf.booking || {}).length,
          });
        });
      }
    });

    // 📊 Convert JSON Data to Worksheet
    const worksheet = XLSX.utils.json_to_sheet(allData);

    // 📚 Define Column Headers
    const columns = [
      { wch: 10 }, // City
      { wch: 25 }, // Turf Name
      { wch: 30 }, // Address
      { wch: 15 }, // Contact Number
      { wch: 15 }, // Turf Variety
      { wch: 15 }, // Turf Type
      { wch: 12 }, // Price Per Hour
      { wch: 12 }, // Ratings 1 Star
      { wch: 12 }, // Ratings 2 Star
      { wch: 12 }, // Ratings 3 Star
      { wch: 12 }, // Ratings 4 Star
      { wch: 12 }, // Ratings 5 Star
      { wch: 12 }, // Booking Count
    ];

    // Apply Column Widths
    worksheet["!cols"] = columns;

    // 📚 Create Workbook and Add Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Turf1 Data");

    // 📁 Save as Excel File
    const fileName = "Turf1_Data.xlsx";
    XLSX.writeFile(workbook, fileName);

    console.log(`✅ Data Exported Successfully to ${fileName}`);
  } catch (error) {
    console.error("❌ Error fetching or exporting turf data:", error);
  }
};

// 🚀 Call the Function
fetchAndExportTurfData();
