const mongoose = require("mongoose");
const config = require("config");

//Get value from default.json with config.get
const db = config.get("mongoURI");

//Connecting to DB with server
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
