const express = require("express");
const expenseRouter = require("./routers/expense.router");
const randomFactRouter = require("./routers/randomFact.router");
const app = express();

app.use(express.json());
app.use("/expenses", expenseRouter);
app.use("/randomFact", randomFactRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
