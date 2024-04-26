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
            userName: user.userName
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
    console.log("Received data:", req.body);  // Log received data (Gives all the info in json through server side :) )
    try {
      const report = await Report.create(req.body);
      res.status(200).send("Uploaded report to the database");
    } catch (error) {
      console.error("Creation error:", error);  // Log detailed error (Gives all the info in json through server side :)  )
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message, errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  

  router.post("/upload/old/report", async (req, res) => {
    try {
      const report = await Report.create({
        crime: req.body.crime, 
        tag: req.body.tag,
        reportDate: req.body.reportDate,
        category: req.body.category,
        reportID: req.body.reportID
      })
      res.status(200).send("Uploaded report to the database")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete('/deactivate', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({email: req.body.email});
        if (!user) {
            return res.status(404).send(); // Send 404 if no blog was found
        }
        res.send(`Successfuly deleted user: ${user}`); // Send deleted blog
    } catch (error) {
        res.status(500).send(error); // Send 500 if an error occurs
    }
});

  router.patch('/update/profile', async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({email: req.body.oldEmail}, {$set: {email: req.body.email, personName: req.body.personName }}, {new:true})
      if (!user) {
        res.status(404).send()
      }
      res.status(200).send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  router.patch('/update/password', async (req, res) => {
    try {
      const user = await User.findOne({ userName: req.body.username});
      if (!user) {
        return res.status(404).send("Could not find username");
      }

      console.log('Stored Password:', user.password);
      console.log('Old Password:', req.body.oldPassword);
      
     
      const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password,);
      console.log('Password comparison result:', isPasswordValid);
  
      if (isPasswordValid) {
        user.password = await bcrypt.hash(req.body.password, 15);
        await user.save(); // Save the updated user with the new password
        return res.status(200).send(user);
      } else {
        return res.status(401).send(`Invalid Passwords: Old Password: ${bcrypt.hash(req.body.oldPassword, 15)} != User.password: ${user.password}`);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).send("Internal server error");
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
