const { Router } = require("express");

const expenseRouter = new Router();

const ExpenseController = require("../controller/expense.controller");
const hasKeyMiddleware = require("../middleware/has-key.middleware");
const validCreateMiddleware = require("../middleware/valid-create.middleware");

expenseRouter.get("/", ExpenseController.getAllExpenses);
expenseRouter.post("/", validCreateMiddleware,ExpenseController.createExpense);
expenseRouter.get("/:id", ExpenseController.getExpenseById);
expenseRouter.delete("/:id", hasKeyMiddleware, ExpenseController.deleteExpenseById);
expenseRouter.put("/:id", ExpenseController.updateExpenseById);

module.exports = expenseRouter;
