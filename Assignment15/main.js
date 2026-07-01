const express = require("express");
const expenseRouter = require("./expenses/expense.controller");
const app = express();

const connectToDB = require("./config/db.config");

app.use(express.json());
app.use("/expenses", expenseRouter);

connectToDB().then(() => {
  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
  });
});
