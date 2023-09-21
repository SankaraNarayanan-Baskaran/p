const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const PORT = 3001;
const bodyParser = require("body-parser");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");
const coursedetails = require("./models/coursedetails");
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());
const sequelize = new Sequelize({
  dialect: "postgres",
  ...require("./config/config.json")["development"],
});
const CourseDetails = sequelize.define("CourseDetails", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  video_url: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
});

const Accounts = sequelize.define("Accounts", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.TEXT,
});

sequelize.sync();
app.post("/api/adduser", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    const userExists = await Accounts.findOne({
      where: {
        username: username,
      },
    });
    if (userExists) {
      return res.status(302).json({
        success: "true",
      });
    } else {
      const newUser = await Accounts.create({
        username,
        password,
        email,
        address,
      });
      return res.status(201).json({
        success: "true",
        message: "Google account",
      });
    }
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/loginuser", async (req, res) => {
  try {
    // console.log(req.body.username);
    const { username, password } = req.body;
    // console.log(username,password);
    const user = await Accounts.findOne({
      where: { username: username, password: password },
    });
    if (user) {
      return res.status(201).json({
        success: "true",
      });
    } else
      return res.status(404).json({
        success: "false",
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/google", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    const userExists = await Accounts.findOne({
      where: {
        username: username,
      },
    });
    if (userExists) {
      return res.status(201).json({
        success: "true",
      });
    } else {
      const newUser = await Accounts.create({
        username,
        password,
        email,
        address,
      });
      return res.status(201).json({
        success: "true",
      });
    }
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/courses/", async (req, res) => {
  try {
    const { name, description, price, video_url, username } = req.body;
    console.log("Username:", username);
    Accounts.findOne({ where: { username: username } }).then((user) => {
      // Create an order associated with the user
      console.log("UserID:", user.id);
      CourseDetails.create({
        name,
        description,
        price,
        video_url,
        user_id: user.id,
      });
      // console.log(userId);
    });

    // res = newCourse;
  } catch (error) {
    console.error("Error creating a CourseDetails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
   console.log("Request:",req.body);
    const param=req.query.username;
    console.log("Param:",param);
    const some = await Accounts.findOne({ where: { username: param } }).then(
      async (users) => {
        // console.log("Userd:",users);
        const details=await CourseDetails.findAll({where:{user_id:users.id}}).then((course)=>{
         console.log("Course:",course);
         res.json(course);
        })

      }

      // console.log(details);
      // res.json(details);
    );
  } catch (error) {
    console.log(req.query.username);
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const course = await CourseDetails.findByPk(id);
    await course.destroy();
  } catch (error) {
    console.error("Error Deleting Course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
