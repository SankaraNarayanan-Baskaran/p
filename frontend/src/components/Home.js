import React from "react";
import VideoPlayer from "./Video";
import Header from "./Header";
import Course from "./Course";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
const Home = () => {
  const location = useLocation();
  const inst = location.state;
  return (
    <div>
      <Header prop={inst} />
      <VideoPlayer />
      <Course />
      <Footer />
    </div>
  );
};

export default Home;
