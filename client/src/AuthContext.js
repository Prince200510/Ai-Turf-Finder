import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logout } from "./pages/auth/Firebase";
import { getDatabase, ref, get, child, set } from "firebase/database";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleGoogleSignIn = async () => {
    try {
      const signedInUser = await signInWithGoogle();
  
      if (signedInUser) {
        console.log("Google User Data:", signedInUser); // ✅ Debugging Log
  
        const { email, displayName, photoURL } = signedInUser;
  
        if (!email || !displayName) {
          toast.error("Google sign-in failed. No email or name found!");
          return;
        }
  
        // ✅ Split full name into firstName and lastName
        const [firstName, lastName = ""] = displayName.split(" ");
  
        // ✅ Format email key
        const emailKey = email.replace(/\./g, "_");
  
        // ✅ Get Database Reference
        const db = getDatabase();
        const userRef = ref(db, `users/${emailKey}`);
  
        // ✅ Check if the user already exists
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
          // ✅ Store user data in correct format
          await set(userRef, {
            email,
            firstName,
            lastName,
            profilePicture: photoURL || "",
          });
  
          console.log("User saved to Firebase!");
        } else {
          console.log("User already exists in Firebase.");
        }
  
        // ✅ Save to local state
        const userData = { email, firstName, lastName, profilePicture: photoURL };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
  
        navigate("/SearchTurf");
        toast.success("Login successful!");
      } else {
        toast.error("Google sign-in failed!");
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      toast.error("Error signing in with Google!");
    }
  };
  
  // ✅ Google Sign-In Handling
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const signedInUser = await signInWithGoogle();
  //     if (signedInUser) {
  //       const { email, displayName } = signedInUser;
        
  //       // Split full name into firstName and lastName
  //       const [firstName, lastName = ""] = displayName?.split(" ") || ["", ""];

  //       const userData = { email, firstName, lastName };

  //       // Save user data
  //       setUser(userData);
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       navigate("/SearchTurf");
  //     }
  //   } catch (error) {
  //     console.error("Google Sign-In Error: ", error);
  //     toast.error("Failed to sign in with Google!");
  //   }
  // };

  // ✅ Manual Email & Password Sign-In
  // const handleSignIn = async (email, password) => {
  //   const db = getDatabase();
  //   const dbRef = ref(db);

  //   try {
  //     const snapshot = await get(child(dbRef, `users/${email.replace(/\./g, "_")}`));
  //     if (snapshot.exists()) {
  //       const userData = snapshot.val();

  //       // Check password
  //       if (bcrypt.compareSync(password, userData.password)) {
  //         const { firstName, lastName } = userData;
  //         const loggedInUser = { email, firstName, lastName };

  //         // Save user data
  //         toast.success("Login successful!");
  //         localStorage.setItem("user", JSON.stringify(loggedInUser));
  //         setUser(loggedInUser);
  //         navigate("/SearchTurf");
  //       } else {
  //         toast.error("Incorrect password!");
  //       }
  //     } else {
  //       toast.error("User not found!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data: ", error);
  //     toast.error("Error signing in!");
  //   }
  // };

  const handleSignIn = async (email, password) => {
    const db = getDatabase();
    const dbRef = ref(db);
  
    try {
      const snapshot = await get(child(dbRef, `users/${email.replace(/\./g, "_")}`));
      if (snapshot.exists()) {
        const userData = snapshot.val();
  
        // ✅ Check password
        if (bcrypt.compareSync(password, userData.password)) {
          const { firstName, lastName } = userData;
  
          // ✅ Include email explicitly (since it's a key in Firebase)
          const loggedInUser = { email, firstName, lastName };
  
          toast.success("Login successful!");
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          setUser(loggedInUser);
          navigate("/SearchTurf");
        } else {
          toast.error("Incorrect password!");
        }
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      toast.error("Error signing in!");
    }
  };

  
  // ✅ Logout Handling
  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSignIn, handleSignIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom Hook for Authentication
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}






















// import React, { useState, createContext, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithGoogle, logout } from "./pages/auth/Firebase";
// import { getDatabase, ref, get, child } from "firebase/database";
// import bcrypt from "bcryptjs";
// import toast from "react-hot-toast";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleGoogleSignIn = async () => {
//     const signedInUser = await signInWithGoogle();
//     if (signedInUser) {
//       const { email, displayName } = signedInUser;

//       // Split displayName to get firstName and lastName
//       const [firstName, lastName] = displayName?.split(" ") || ["", ""];

//       const userData = { email, firstName, lastName };

//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));
//       navigate("/SearchTurf");
//     }
//   };


//   const handleSignIn = async (email, password) => {
//     const db = getDatabase();
//     const dbRef = ref(db);
    
//     try {
//       const snapshot = await get(child(dbRef, `users/${email.replace(/\./g, "_")}`));
//       if (snapshot.exists()) {
//         const userData = snapshot.val();
//         if (bcrypt.compareSync(password, userData.password)) {
//           const { firstName, lastName } = userData; 
//           const loggedInUser = { email, firstName, lastName };
//           toast.success("Login successful!");
//           localStorage.setItem("user", JSON.stringify(userData));
//           setUser(userData);
//           navigate("/SearchTurf");
//         } else {
//           toast.error("Incorrect password!");
//         }
//       } else {
//         toast.error("User not found!");
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       toast.error("Error signing in!");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, handleGoogleSignIn, handleSignIn, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
