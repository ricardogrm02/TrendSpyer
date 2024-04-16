const mongoose = require('mongoose');
const express = require('express');

const crimeReportRoute = require("./routes/crimeReportRoute");
const mapRoute = require("./routes/mapRoute");
const userRoute = require("./routes/userRoute")

const app = express();
app.use(express.json())

const dbURI = 'mongodb+srv://user123:senya4UGwpOzpkTN@trendspyer.38bmyjh.mongodb.net/?retryWrites=true&w=majority&appName=TrendSpyer'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, (req,res) => {
        console.log("Connected to Trendspyer database and listening on http://localhost:3000");
    }))
    .catch((error) => console.log(error));

app.use('/api/user', userRoute)
app.use('/api/map', mapRoute)
app.use('/api/report', crimeReportRoute)

