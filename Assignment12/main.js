#!/usr/bin/env node

// 1) დაწერეთ todo-cli ხელსაწყო ქომანდერის გამოყენებით რომელსაც ექნება შემდეგი ფუნცქიონალი:
// todo-cli show => დააბრუნებს ყველა თუდუს ობიექტს
// todo-cli add todoName => დაგიბრუნებთ ახალ შექმნილ თუდუს
// todo-cli delete todoId => დაგიბრუნებთ წაშლილ თუდუს
// todo-cli todoId --name todoName => დაგიბრუნებთ განახლებულ თუდუს.
// თუდუს ობიექტს უნდა გამოიყურებოდეს: {id: 1, title: "ReadBook", isDone: false}
// შეგიძლიათ დაამატოთ სხვადასხვა ფროფერთიები, გაითვალისიწნეთ განახლება უნდა მოხდეს option მეთოდით.

import { Command } from "commander";
import { readFile, writeFile } from "./utils/fs.utils.js";

const program = new Command();

program
  .name("ToDo CLI")
  .description("This is simple ToDo cli tool")
  .version("1.0.0");

program
  .command("show")
  .description("returns all todos")
  .action(async () => {
    const todos = await readFile("todos.json", true);
    console.log(todos);
  });

program
  .command("add")
  .description("adds new todo")
  .argument("<name>", "todo name")
  .action(async (name) => {
    const todos = await readFile("todos.json", true);
    const lastId = todos[todos.length - 1]?.id || 0;

    const newTodo = {
      id: lastId + 1,
      title: name,
      isDone: false,
    };

    todos.push(newTodo);
    await writeFile("todos.json", todos);
  });

program
  .command("delete")
  .description("deletes todo")
  .argument("<id>", "unique id of movie")
  .action(async (id) => {
    const todos = await readFile("todos.json", true);
    const index = todos.findIndex((t) => t.id === Number(id));
    if (index === -1) {
      console.log("Wrong id provided");
      return;
    }

    const deletedTodo = todos.splice(index, 1);
    await writeFile("todos.json", todos);

    console.log(`Deleted todo: ${JSON.stringify(deletedTodo[0])}`);
  });

program
  .command("update")
  .description("update todo by id")
  .argument("<id>", "unique id of movie")
  .option("-n, --name <name>", "name property")
  .action(async (id, opts) => {
    const todos = await readFile("todos.json", true);
    const index = todos.findIndex((t) => t.id === Number(id));

    if (index === -1) {
      console.log("Wrong id provided");
      return;
    }

    const updateReq = {};
    if (opts.name) {
      updateReq["title"] = opts.name;
    }

    todos[index] = {
      ...todos[index],
      ...updateReq,
    };
    await writeFile("todos.json", todos);
  });

program.parse();
