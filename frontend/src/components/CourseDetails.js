import React from "react";
import Header from "./Header";
import VideoPlayer from "./Video";
import "./CourseDetails.css"
import Footer from "./Footer";
const CourseDetails = () => {
  return (
    <div>
      <Header isAuthorised />
      <div class="row">
        <div class="col-lg-8 des">
          <h2>Course Modules</h2>
        </div>
        <div class="col-lg-4 vid">
          <VideoPlayer/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseDetails;
