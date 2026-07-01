const { Router } = require("express");

const expenseRouter = new Router();
const ExpenseService = require("./expense.service");
const isValidMongoIdMiddleware = require("../middleware/is-valid-mongo-id.middleware");

expenseRouter.get("/", async (req, resp) => {
  let expenses = await ExpenseService.getAllExpenses(req.query);
  resp.status(200).json(expenses);
});

expenseRouter.post("/", async (req, resp) => {
  const newExpense = await ExpenseService.createExpense(req.body);
  resp.status(201).json(newExpense);
});

expenseRouter.get("/top-:n", async (req, resp) => {
  let expenses = await ExpenseService.getTopExpenses(req.params.n);
  resp.status(200).json(expenses);
});

expenseRouter.get("/:id", isValidMongoIdMiddleware, async (req, resp) => {
  let expense = await ExpenseService.getExpenseById(req.params.id);

  if (!expense) {
    return resp.status(404).json({ message: "expense not found" });
  }
  resp.json(expense);
});

expenseRouter.delete("/:id", isValidMongoIdMiddleware, async (req, resp) => {
  let deletedExpense = await ExpenseService.deleteExpenseById(req.params.id);

  if (!deletedExpense) {
    return resp.status(404).json({ message: "expense not found" });
  }

  resp.json({ success: true, deleted: deletedExpense });
});

expenseRouter.put("/:id", isValidMongoIdMiddleware, async (req, resp) => {
  let updatedExpense = await ExpenseService.updateExpenseById(
    req.params.id,
    req.body,
  );

  if (!updatedExpense) {
    return resp.status(404).json({ message: "expense not found" });
  }

  resp.status(200).json(updatedExpense);
});

module.exports = expenseRouter;
