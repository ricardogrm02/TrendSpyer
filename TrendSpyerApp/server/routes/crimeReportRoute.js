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

  router.delete("/delete", async (req, res) => {
    try {
      const report = await CrimeReport.findOneAndDelete({reportID: req.body.reportID});
      if (!report) {
          return res.status(404).send(); // Send 404 if no blog was found
      }
      res.send(`Successfuly deleted report: ${report}`); // Send deleted blog
  } catch (error) {
      res.status(500).send(error); // Send 500 if an error occurs
  }
  });

  module.exports = router;