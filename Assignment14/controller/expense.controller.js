const ExpenseService = require("../service/expense.service");

exports.getAllExpenses = async (req, resp) => {
  let expenses = await ExpenseService.getAllExpenses(req.query);
  resp.status(200).json(expenses);
};

exports.createExpense = async (req, resp) => {
  const newExpense = await ExpenseService.createExpense(req.body);
  resp.status(201).json(newExpense);
};

exports.getExpenseById = async (req, resp) => {
  const id = Number(req.params.id);
  let expense = await ExpenseService.getExpenseById(id);

  if (!expense) {
    return resp.status(404).json({ message: "expense not found" });
  }
  resp.json(expense);
};

exports.deleteExpenseById = async (req, resp) => {
  const id = Number(req.params.id);
  let deletedExpense = await ExpenseService.deleteExpenseById(id);

  if (deletedExpense === "Not found") {
    return resp.status(404).json({ message: "expense not found" });
  }

  resp.json({ success: true, deleted: deletedExpense });
};

exports.updateExpenseById = async (req, resp) => {
  const id = Number(req.params.id);
  let updatedExpense = await ExpenseService.updateExpenseById(id, req.body);

  if (!updatedExpense) {
    return resp.status(404).json({ message: "expense not found" });
  }

  resp.status(200).json(updatedExpense);
};
