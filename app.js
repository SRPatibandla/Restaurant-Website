const express= require("express");
const urlencodedParser = express.urlencoded({ extended: true });
const MongoClient = require("mongodb").MongoClient;
const bcrypt=require("bcrypt");
const connectEnsureLogin=require("connect-ensure-login")
const app=express();
const port =5000;


const url = "mongodb://localhost:27017"


app.use(express.static("public"))
app.use(express.json())
app.use(urlencodedParser)


MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to database");
  });



  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, ()=>console.log(`Server is listening on ${port}`))