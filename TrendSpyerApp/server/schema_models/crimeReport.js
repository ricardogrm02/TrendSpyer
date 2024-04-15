const mongoose = require("mongoose")
const crimeReportSchema = new mongoose.Schema({
    crime: {type: String, required: true},
    tag: {type: String, required: true},
    reportDate: {type: Date, required: true},
    category: {type: String, required: true},
    reportID: {type: Number, required: true}

  },{
    collection: 'crime report'
  })
  
  const crimeReport = mongoose.model("crime report", crimeReportSchema);
  
  module.exports = crimeReport;
 /*CREATE TABLE CrimeReport (
Crime VARCHAR(100) NOT NULL,
Tag VARCHAR(100) NOT NULL,
reportDate Date NOT NULL,
Category VARCHAR(100) NOT NULL,
Images VARBINARY(8000)
reportID INT PRIMARY KEY NOT NULL
)*/