#!/usr/bin/env node

import { Command } from "commander";
import { readFile, writeFile } from "./utils/fs.utils.js";

const program = new Command();

// 2) გააკეთეთ weather-cli ხელსაწყო რომელსაც ექნება შემდეგი ფუნქციონალი:
// weather-cli tbilisi => დაგიბრუნებთ თბილისში რა ამინდია იმას, თუ ისეთ ქალაქს ჩაწერთ რაც არ იძებნება დააბრუნეთ შესაბამისი ერორი.
// ამინდის ინფორმაცია უნდა წამოიღოთ შემდეგი ეიპიაიდან:
// https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// cityName ის ნაცვლად უნდა გამოიყენოთ არგუმენტად მიღებული ქალაქის სახელი და გამოაჩინოთ შესაბამისი მონაცემები.
program
  .name("Weather CLI")
  .description("This is simple Weather cli tool")
  .version("1.0.0");

program.argument("<city>", "city name").action(async (city) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`,
  );
  const data = await resp.json();

  if (!resp.ok) {
    console.log("City not found");
    return;
  }

  console.log(data);
});

program.parse();
