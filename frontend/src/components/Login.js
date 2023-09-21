import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import UploadCourse from "./UploadCourse";
import Footer from "./Footer";
import axios from "axios";
import { config } from "../App";
import "./Login.css";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
 
  const validateInput = (data) => {
    if (data.username === "") {
      toast("Username is a required field");
      return false;
    }
    if (data.password === "") {
      toast("Password is a required field");
      return false;
    }
    return true;
  };
  function generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }
  const logged = async (formData) => {
    if (validateInput(formData)) {
      try {
        // console.log(formData.username);
        const res = await axios.post(config.endpoint + "/loginuser", {
          username: formData.username,
          password: formData.password,
        });
        console.log(res.status);
        if (res.status === 201) {
          localStorage.setItem("username", formData.username);
          navigate("/", { state: { isLogged: "true" } });
        }
      } catch (error) {
        // console.log(formData.username)
        console.log(error);
      }
    }
  }
  const handleggl = async (userData) => {
    try {
      const res = await axios.post(config.endpoint + "/google", {
        username: userData.username,
        password:userData.password,
        email: userData.email,
      });
      if (res.status === 201) {
        localStorage.setItem("username", userData.username);
        navigate("/",{state:{isLogged:"true"}})
      }
      
    } catch (error) {
      console.log(error);
    }}
  const navigate = useNavigate();
  return (
    <div>
      <Header isAuthorised />
      <center>
        <div className="login-container">
          <h2>Login</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
          <button
            className="login-button mb-3"
            onClick={() => {
              logged(formData);
            
            }}
          >
            Login
          </button>
          <div>
          <LoginSocialGoogle
                client_id="450692513840-1ujucbe7nonf99hu09ss6b9b4ptajjs6.apps.googleusercontent.com"
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(provider, data);
                  const name = data.name;
                  const email = data.email;
                  const password=generateRandomPassword(10);
                  const userData = {
                    username: name,
                    password:password,
                    email: email,
                  };
                  handleggl(userData);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <GoogleLoginButton />
              </LoginSocialGoogle>
          </div>
        </div>
        <Toaster position="top-center" />
      </center>
      <Footer />
    </div>
  );
};

export default Login;
