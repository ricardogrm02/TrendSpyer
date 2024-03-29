const express = require("express");
const router = express.Router();
const CrimeReport = require("../schema_models/crimeReport")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/info", async (req, res) => {
    try {
      
      const crimeReports = await CrimeReport.find();
      res.json(crimeReports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;