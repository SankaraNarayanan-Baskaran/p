import React from "react";
import image from "../Images/bgimage.jpg";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const Course = () => {
    const navigate=useNavigate()
  return (
    <>
      <div class="col-lg-2">
        <div class="card mb-3" style={{ width: "18rem"}}>
          <img class="card-img-top" src={image} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Course title</h5>
            <p class="card-text">
              Course Description
            </p>
            <button onClick={()=>{
                navigate("/CourseDetails")
            }}>More Details</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Course;
