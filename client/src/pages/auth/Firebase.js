// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { getDatabase, ref, set, get } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDBwhqwEl5P48hGqBW47c_jKvnU0hPHsxs",
//   authDomain: "turf-finder-4bfdd.firebaseapp.com",
//   projectId: "turf-finder-4bfdd",
//   storageBucket: "turf-finder-4bfdd.firebasestorage.app",
//   messagingSenderId: "376213126620",
//   appId: "1:376213126620:web:c4114dfc326666a8e5e319",
//   measurementId: "G-JKMG23HYKV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);
// const analytics = getAnalytics(app);
// const provider = new GoogleAuthProvider();

// // Google Sign-In Function
// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     // Store user data in Realtime Database
//     set(ref(database, "users/" + user.uid), {
//       name: user.displayName,
//       email: user.email,
//       profilePicture: user.photoURL,
//     });
//     return user;
//   } catch (error) {
//     console.error("Google Sign-In Error:", error);
//     return null;
//   }
// };

// // Google Sign-Out Function
// export const logout = async () => {
//   try {
//     await signOut(auth);
//     console.log("User signed out");
//   } catch (error) {
//     console.error("Sign-Out Error:", error);
//   }
// };

// // Function to Write Data to Realtime Database
// export const writeData = (userId, data) => {
//   set(ref(database, "users/" + userId), data)
//     .then(() => console.log("Data written successfully!"))
//     .catch((error) => console.error("Write Error:", error));
// };

// // Function to Read Data from Realtime Database
// export const readData = async (userId) => {
//   try {
//     const snapshot = await get(ref(database, "users/" + userId));
//     if (snapshot.exists()) {
//       return snapshot.val();
//     } else {
//       console.log("No data available");
//       return null;
//     }
//   } catch (error) {
//     console.error("Read Error:", error);
//     return null;
//   }
// };

// export { auth, database, app, firebaseConfig };


import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBwhqwEl5P48hGqBW47c_jKvnU0hPHsxs",
  authDomain: "turf-finder-4bfdd.firebaseapp.com",
  projectId: "turf-finder-4bfdd",
  storageBucket: "turf-finder-4bfdd.firebasestorage.app",
  messagingSenderId: "376213126620",
  appId: "1:376213126620:web:c4114dfc326666a8e5e319",
  measurementId: "G-JKMG23HYKV"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const database = getDatabase(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    set(ref(database, "users/" + user.uid), {
      name: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
    });
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};

export const writeData = (userId, data) => {
  set(ref(database, "users/" + userId), data)
    .then(() => console.log("Data written successfully!"))
    .catch((error) => console.error("Write Error:", error));
};

export const readData = async (userId) => {
  try {
    const snapshot = await get(ref(database, "users/" + userId));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Read Error:", error);
    return null;
  }
};

export { auth, database, app, firebaseConfig };
