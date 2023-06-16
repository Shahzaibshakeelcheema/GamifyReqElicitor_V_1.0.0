const mongoose = require("mongoose");
const { Schema } = mongoose;
const Userschema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});
const Userdb = mongoose.model("User", Userschema);

module.exports = Userdb;
