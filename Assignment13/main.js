const express = require("express");
const {
  readFile,
  writeFile,
} = require("./utils/fs.utils");
const app = express();

// 1) შექმენით ხარჯების(expenses) ქრადი ექსპრესის გამოყენებით. +
// 2) დაამატეთ ფეჯინეიშენის ფიჩერი, /expenses?page=1&take=30 უნდა დააბურნოს 30 ჩანაწერი, გაითვალისწინეთ ზედა ზღვარზე შეზღუდვა
// 3) დაამატეთ ვალიდაცია წაშლის დროს, უზერმა უნდა შეძლოს ხარჯის წაშლა მხოლოდ მაშინ თუ ჰედერში გამოატანს
//  რაიმე კოდურ სიტყვას მაგალითად secret=random123 +
// 4) გაჰენდლეთ ერორები, ყველა ენდოითნზე როდესაც კლიენტი არასწორ ინფორმაციას გამოატანს გაუზაგვნეთ შესაბამისი სტატუს კოდები, +
// გამოიყენეთ FS მოდული და ExpressJS, ხარჯები უნდა შეინახოტ expenses.json ფაილში +

app.use(express.json());

app.get("/expenses", async (req, resp) => {
  const expenses = await readFile("expenses.json", true);

  const page = Math.max(1, Number(req.query.page) || 1);
  const take = Math.min(20, Math.max(1, Number(req.query.take) || 20));

  const start = (page - 1) * take;
  const result = expenses.slice(start, start + take);

  resp.status(200).json(result);
});

app.post("/expenses", async (req, resp) => {
  if (!req.body || !req.body.category || !req.body.price) {
    return resp.status(400).json({ message: "category and price is required" });
  }
  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpense = {
    id: lastId + 1,
    category: req.body.category,
    price: Number(req.body.price),
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);

  resp.status(201).json(newExpense);
});

app.get("/expenses/:id", async (req, resp) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((exp) => exp.id === Number(id));
  if (index === -1) {
    return resp.status(404).json({ message: "expense not found" });
  }

  resp.json(expenses[index]);
});

app.delete("/expenses/:id", async (req, resp) => {
  const secret = req.headers["secret"];
  if (secret !== "random123") {
    return resp.status(401).json({ message: "delete denied" });
  }

  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const index = expenses.findIndex((exp) => exp.id === Number(id));
  if (index === -1) {
    return resp.status(404).json({ message: "expense not found" });
  }

  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);

  resp.json({ success: true, deleted: deletedExpense });
});

app.put("/expenses/:id", async (req, resp) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((exp) => exp.id === Number(id));

  if (index === -1) {
    return resp.status(404).json({ message: "expense not found" });
  }

  const updateReq = {};

  if (req.body.category) {
    updateReq["category"] = req.body.category;
  }
  if (req.body.price) {
    updateReq["price"] = Number(req.body.price);
  }

  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };

  await writeFile("expenses.json", expenses);
  resp.status(200).json(expenses[index]);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
