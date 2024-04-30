const mongoose = require("mongoose");

const crimeReportSchema = new mongoose.Schema({
    crime: { type: String, required: true },
    tag: { type: String, required: true },
    reportDate: { type: Date, required: true },
    category: { type: String, required: true },
    reportID: { type: Number, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },  // 'location.type' must be 'Point'
        coordinates: {
            type: [Number],  // Array of numbers for longitude and latitude
            required: true
        }
    },
    Image: {
        data: { type: Buffer, default: null }, // Default value for data field
        contentType: { type: String, default: null } // Default value for contentType field
    },
}, {
    collection: 'crime report'
});

// Create an index on the 'location' field for geospatial queries
crimeReportSchema.index({ location: '2dsphere' });

const CrimeReport = mongoose.model("crime report", crimeReportSchema);

module.exports = CrimeReport;
