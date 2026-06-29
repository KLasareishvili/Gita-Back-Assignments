const { readFile, writeFile } = require("../utils/fs.utils");

exports.getAllExpenses = async (query) => {
  const expenses = await readFile("expenses.json", true);

  const page = Math.max(1, Number(query.page) || 1);
  const take = Math.min(20, Math.max(1, Number(query.take) || 20));

  const start = (page - 1) * take;
  const result = expenses.slice(start, start + take);

  return result;
};

exports.createExpense = async (body) => {
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpense = {
    id: lastId + 1,
    category: body.category,
    price: Number(body.price),
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);
  return newExpense;
};

exports.getExpenseById = async (id) => {
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((exp) => exp.id === Number(id));
  if (index === -1) {
    return null;
  }
  return expenses[index];
};

exports.deleteExpenseById = async (id) => {
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((exp) => exp.id === Number(id));
  if (index === -1) {
    return "Not found";
  }

  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);
  return deletedExpense;
};

exports.updateExpenseById = async (id, body) => {
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((exp) => exp.id === Number(id));

  if (index === -1) {
    return null;
  }

  const updateReq = {};

  if (body.category) {
    updateReq["category"] = body.category;
  }
  if (body.price) {
    updateReq["price"] = Number(body.price);
  }

  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };

  await writeFile("expenses.json", expenses);
  return expenses[index];
};
