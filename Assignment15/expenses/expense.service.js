const expenseModel = require("./expense.model");

exports.getAllExpenses = async (query) => {
  const filter = {};
  if ("amountFrom" in query) {
    filter["price"] = {
      ...filter["price"],
      $gte: Number(query.amountFrom),
    };
  }

  if ("amountTo" in query) {
    filter["price"] = {
      ...filter["price"],
      $lte: Number(query.amountTo),
    };
  }

  if (query.category) {
    filter.category = { $in: query.category.split(",") };
  }

  const page = Math.max(1, Number(query.page) || 1);
  const take = Math.min(20, Math.max(1, Number(query.take) || 20));

  const result = await expenseModel
    .find(filter)
    .skip((page - 1) * take)
    .limit(take);

  return result;
};

exports.createExpense = async (body) => {
  const newExpense = await expenseModel.create({
    category: body.category,
    price: body.price,
  });
  return newExpense;
};

exports.getExpenseById = async (id) => {
  const expense = await expenseModel.findById(id);
  if (!expense) {
    return null;
  }
  return expense;
};

exports.deleteExpenseById = async (id) => {
  const deletedExpense = await expenseModel.findByIdAndDelete(id);

  if (!deletedExpense) {
    return null;
  }
  return deletedExpense;
};

exports.updateExpenseById = async (id, body) => {
  const updatedExpense = await expenseModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedExpense) {
    return null;
  }
  return updatedExpense;
};

exports.getTopExpenses = async (n) => {
  const topExpenses = await expenseModel
    .find()
    .sort({ price: -1 })
    .limit(Number(n));
  return topExpenses;
};
