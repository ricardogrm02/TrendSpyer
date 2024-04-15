const express = require("express");
const router = express.Router();
const Map = require("../schema_models/map")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/info", async (req, res) => {
    try {
      
      const map = await Map.find();
      res.json(map);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  router.post("/location", async (req, res) => {
    try {
      const location = await Map.create({
       LocationName: req.body.LocationName,
       latitude: req.body.latitude,
       longitude: req.body.longitude,
      })
      res.status(200).send("Location of intrest added to database")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete('/remove/location', async (req, res) => {
    try {
        const location = await Map.findOneAndDelete({latitude: req.body.latitude, longitude: req.body.longitude});
        if (!location) {
            return res.status(404).send(); // Send 404 if no blog was found
        }
        res.send(`Successfuly deleted location: ${location}`); // Send deleted blog
    } catch (error) {
        res.status(500).send(error); // Send 500 if an error occurs
    }
});

  

  

  module.exports = router;