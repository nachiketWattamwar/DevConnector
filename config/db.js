const mongoose = require("mongoose");

const config = require("config");

const db = config.get("MongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("DB connected.");
  } catch (error) {
    console.log("Error in connecting to DB.");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
