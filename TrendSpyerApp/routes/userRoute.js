const express = require("express");
const router = express.Router();
const User = require("../schema_models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/info", async (req, res) => {
    try {
      
      const user = await User.find();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

/*CREATE TABLE Map (
    crimeLocations geography NOT NULL,
    LocationName VARCHAR(500) NOT NULL
)

CREATE TABLE Users (
username VARCHAR(150) NOT NULL,
age INT NOT NULL,
email  VARCHAR(150) NOT NULL PRIMARY KEY,
sex CHAR NOT NULL,
personName VARCHAR(150) NOT NULL
)

CREATE TABLE CrimeReport (
Crime VARCHAR(100) NOT NULL,
Tag VARCHAR(100) NOT NULL,
reportDate Date NOT NULL,
Category VARCHAR(100) NOT NULL,
Images VARBINARY(8000)
reportID INT PRIMARY KEY NOT NULL
) */

module.exports = router;
