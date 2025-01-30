"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Create the Auth Context
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [profile, setProfile] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("isLogin") || null;
    if (token != null) {
      fetchProfile();
      console.log("Token found - ", token);
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/profile`,
        { withCredentials: true }
      );
      console.log("Profile fetched successfully:", response.data);
      setProfile(response.data);
      setIsAuth(true);
    } catch (error) {
      if (error.response?.status == 403) {
        console.log("Unauthorized access - redirecting to login");
        setIsAuth(false);
        //router.push("/login");
      } else {
        console.error("Error fetching profile:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuth,
        fetchProfile,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
