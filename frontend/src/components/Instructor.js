import React from "react";
import Header from "./Header";
import VideoInput from "./VideoInput";
import "./Instructor.css";
import Footer from "./Footer";
import UploadCourse from "./UploadCourse";
import { useNavigate } from "react-router-dom";
const Instructor = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Header isAuthorised={false} prop student />
      <div className="container">
        <h2>Jump into Course creation</h2>
        <button className="btn btn-outline-dark mx-6 mr-2 my-2 my-sm-0" onClick={()=>{
          navigate("/UploadCourse");
        }}>Create Your Course</button>
      </div>
      
      
    </div>
    
  );
};

export default Instructor;
