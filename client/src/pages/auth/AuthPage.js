import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../TurfCare/TurfCare.css";
import "./auth.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, logout } from "./Firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  // Corrected useEffect to prevent infinite loop
  useEffect(() => {
    if (user) {
      navigate("/SearchTurf");
    }
  }, [user, navigate]); // Added user as a dependency.


  const handleGoogleSignIn = async () => {
    try {
      const signedInUser = await signInWithGoogle();
  
      if (signedInUser) {
        console.log("Google User Data:", signedInUser); 
  
        const { email, displayName, photoURL } = signedInUser;
  
        if (!email || !displayName) {
          toast.error("Google sign-in failed. No email or name found!");
          return;
        }
  
        const [firstName, lastName = ""] = displayName.split(" ");
        const emailKey = email ? email.replace(/\./g, "_") : "";
        const db = getDatabase();
        const userRef = ref(db, `users/${emailKey}`);
  
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
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
        const userData = { email, firstName, lastName, profilePicture: photoURL };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
  
        toast.success("Login successful!");
        window.location.reload();
      } else {
        toast.error("Google sign-in failed!");
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      toast.error("Error signing in with Google!");
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSignIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function SignIn({ toggleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const dbRef = ref(db);
    
    get(child(dbRef, `users/${email.replace(/\./g, "_")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (bcrypt.compareSync(password, userData.password)) {
            Swal.fire({
              icon: "success",
              title: "Login successful!",
              text: "Welcome back!",
              timer: 2000,
              showConfirmButton: false,
            });
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Incorrect Password",
              text: "Please try again.",
            });
          }
        } else {
          toast.error("User not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="auth-box">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="auth-box-button">
          <button type="submit">Login</button> 
        </div>
      </form>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        <FcGoogle className="google-icon" /> Sign in with Google
      </button>
      <p onClick={toggleAuth} className="toggle-link">
        Don't have an account? Sign Up
      </p>
    </div>
  );
}

function SignUp({ toggleAuth }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleGoogleSignIn } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please re-enter your passwords.",
      });
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db);
    
    get(child(dbRef, `users/${email.replace(/\./g, "_")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          Swal.fire({
            icon: "error",
            title: "Email Already Registered",
            text: "Try logging in instead.",
          });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          set(ref(db, `users/${email.replace(/\./g, "_")}`), {
            email,
            firstName,
            lastName,
            password: hashedPassword,
          }).then(() => {
            Swal.fire({
              icon: "success",
              title: "User Registered Successfully!",
              text: "You can now log in.",
              timer: 2000,
              showConfirmButton: false,
            });
          }).catch((error) => {
            console.error("Error saving data: ", error);
          });
        }
      })
      .catch((error) => {
        console.error("Error checking user existence: ", error);
      });
  };

  return (
    <div className="auth-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="auth-box-button">
          <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        <FcGoogle className="google-icon" /> Sign in with Google
      </button>
      <p onClick={toggleAuth} className="toggle-link">
        Already have an account? Sign In
      </p>
    </div>
  );
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthProvider>
      <div className="auth-container">
        {isSignUp ? <SignUp toggleAuth={() => setIsSignUp(false)} /> : <SignIn toggleAuth={() => setIsSignUp(true)} />}
      </div>
    </AuthProvider>
  );
}
