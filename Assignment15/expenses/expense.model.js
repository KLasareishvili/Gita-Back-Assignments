const { default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("expense", expenseSchema);
