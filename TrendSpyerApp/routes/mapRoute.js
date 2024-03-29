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

  module.exports = router;