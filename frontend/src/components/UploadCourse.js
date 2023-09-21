import React, { useState } from "react";
import Header from "./Header";
import VideoInput from "./VideoInput";
import { config } from "../App";
import axios from "axios";
import { useEffect } from "react";
import image from "../Images/download.jpg";
import { useNavigate } from "react-router-dom";
import video from "../Videos/video.mp4";
import "./UploadCourse.css";
import VideoPlayer from "./Video";
const UploadCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const username = localStorage.getItem("username");
  const queryParams = {
    username: username,
  };
  // console.log(username);
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    price: "",
    video_url: "",
    username: username,
  });

  useEffect(() => {
    // Fetch all courses when the component mounts
    fetchcourses();
  }, []);

  const fetchcourses = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/courses`, {
        params: queryParams,
      });
      console.log(response.data);
      setCourses(response.data);
      console.log("Courses:", courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(`${config.endpoint}/courses`, newCourse);
      // Clear the form and fetch the updated list of courses
      setNewCourse({ name: "", description: "", price: "", video_url: "" });
      fetchcourses();
    } catch (error) {
      console.error("Error adding a Course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`${config.endpoint}/courses/${id}`);
      // Fetch the updated list of courses after deleting
      fetchcourses();
    } catch (error) {
      console.error("Error deleting a Course:", error);
    }
  };

  return (
    <div>
      <Header isAuthorised={false} prop student />
      <h1>Course Management</h1>
      <h2>Add a course</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={newCourse.price}
          onChange={(e) =>
            setNewCourse({ ...newCourse, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newCourse.video_url}
          onChange={(e) =>
            setNewCourse({ ...newCourse, video_url: e.target.value })
          }
        />
        {/* <input
          type="file"
          placeholder="video"
          value={newCourse.video_url}
          onChange={(e) =>
            setNewCourse({ ...newCourse, video_url: e.target.value })
          }
        /> */}
        <button onClick={handleAddCourse}>Add course</button>
      </div>
      <h2>Courses</h2>
      <div className="row mx-2">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="row mx-2">
              <div className="card mb-3 course-card" style={{ width: "18rem" }}>
                <VideoPlayer source={course.video_url} />
                <div class="card-body">
                  <h5 class="card-title">{course.name}</h5>
                  <p class="card-text">{course.description}</p>
                  <p>{course.price}</p>
                </div>
                <button onClick={() => navigate("/CourseDetails")}>
                  View Course
                </button>
                <button onClick={() => handleDeleteCourse(course.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UploadCourse;
