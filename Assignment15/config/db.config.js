const { default: mongoose } = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected successfully");
  } catch (e) {
    console.log("DB Failed to connect", e);
  }
};
