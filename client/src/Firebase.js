import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBwhqwEl5P48hGqBW47c_jKvnU0hPHsxs",
  authDomain: "turf-finder-4bfdd.firebaseapp.com",
  projectId: "turf-finder-4bfdd",
  storageBucket: "turf-finder-4bfdd.firebasestorage.app",
  messagingSenderId: "376213126620",
  appId: "1:376213126620:web:c4114dfc326666a8e5e319",
  measurementId: "G-JKMG23HYKV"
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, push };
