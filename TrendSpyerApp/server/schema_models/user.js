const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sex: {type: String, required: true},
    personName: {type: String, required: true},
    quote: {type: String},
  },{
    collection: 'user'
  })
  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;
  
/*CREATE TABLE Users (
username VARCHAR(150) NOT NULL,
age INT NOT NULL,
email  VARCHAR(150) NOT NULL PRIMARY KEY,
sex CHAR NOT NULL,
personName VARCHAR(150) NOT NULL
)
*/
