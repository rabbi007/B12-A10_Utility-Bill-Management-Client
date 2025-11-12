import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


  // const signOutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  const signOutUser = async () => {
    try {
      await signOut(auth); // Firebase logout
      setLoading(true);
      setCurrentUser(null); // Clear the currentUser state
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current Logged-in User-Email:", user?.email || "No User Email!");      
      console.log("Current Logged-in User-ProviderId:", user.providerData?.[0]?.providerId || "No Provider!");
      // console.log("Current Logged-in User-Details:", user || "No User Data!");
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
