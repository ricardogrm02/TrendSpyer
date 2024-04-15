const mongoose = require("mongoose")
const mapSchema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    LocationName: {type: String, required: true}
  },{
    collection: 'map'
  })
  
  const Map = mongoose.model("map", mapSchema);
  
  module.exports = Map;
  
  /*CREATE TABLE Map (
    crimeLocations geography NOT NULL,
    LocationName VARCHAR(500) NOT NULL
)*/
