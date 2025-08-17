import React, { createContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/apiConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const loginstudent = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        // Call backend student login
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login-student`, // ✅ fixed
          { email: data.email }
        );

        if (response.status === 200) {
          const studentDetails = { ...response.data, role: "student" };
          localStorage.setItem("user", JSON.stringify(studentDetails));
          setUser(studentDetails);
          navigate("/student/dashboard");
        } else {
          console.error("Authentication failed: ", response.data);
        }
      } catch (error) {
        console.error("Error during login: ", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  const loginfa = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        // Call backend FA login
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login-fa`, // ✅ fixed
          { email: data.email }
        );

        if (response.status === 200) {
          const faDetails = { ...response.data, role: "fa" };
          localStorage.setItem("user", JSON.stringify(faDetails));
          setUser(faDetails);
          navigate("/fa/dashboard");
        } else {
          console.error("Authentication failed: ", response.data);
        }
      } catch (error) {
        console.error("Error during login: ", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginstudent, loginfa, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
