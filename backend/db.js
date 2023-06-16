const mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
//const uri ="mongodb://127.0.0.1:27017";
//const mongoURI='mongodb://localhost:27017/?tls=false&readPreference=primary'
const uri = "mongodb://127.0.0.1:27017/GamifyReqElicit";
//GamifyReqElicit?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
const connectdb = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("Could not connect", err);
    });

  // await mongoose.connect(uri,

  //(err) => {
  // if(err) console.log(err)
  //  else console.log("mongdb is connected");
  //}
  // )
  //await mongoose.connect(mongoURI, ()=>{
  //  console.log('connected to mongoose successfully')
  //})
};
module.exports = connectdb;
