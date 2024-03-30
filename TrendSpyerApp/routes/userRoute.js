const express = require("express");
const router = express.Router();
const User = require("../schema_models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Report = require("../schema_models/crimeReport")

router.get("/info", async (req, res) => {
    try {
      
      const user = await User.find();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/register", async (req, res) => {
    const newPassword = await bcrypt.hash(req.body.password, 15)
    try {
      const user = await User.create({
        userName: req.body.userName,
        age: req.body.age,
        email: req.body.email,
        password: newPassword,
        sex: req.body.sex,
        personName: req.body.personName
      })
      res.status(200).send("User regstered to database")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
      });
    
      if (!user) {
        return { status: "error", error: "Invalid Login" };
      }
      // console.log(user)
    
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password,
      );
    
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            personName: user.personName,
            email: user.email,
          },
          "secret123",
        );
        // console.log(token);
        return res.json({ status: "Ok", user: token });
      } else {
        return res.json({ status: "error", user: false });
      }
  });

  router.post("/upload/report", async (req, res) => {
    try {
      const report = await Report.create({
        crime: req.body.crime, 
        tag: req.body.tag,
        reportDate: Date.now(),
        category: req.body.category,
        reportID: req.body.reportID
      })
      res.status(200).send("Uploaded report to the database")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  /*    crime: {type: String, required: true},
    tag: {type: String, required: true},
    reportDate: {type: Date, required: true},
    category: {type: String, required: true},
    reportID: {type: Number, required: true} */
/*const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sex: {type: Number, required: true},
    personName: {type: String, required: true},
    quote: {type: String},
  },{
    collection: 'user'
  })*/

module.exports = router;
