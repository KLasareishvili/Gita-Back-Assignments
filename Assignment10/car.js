// 3) შექმენით car.js და cars.json ფაილები.
// როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari 2020 red უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში.
// გაითვალისწინეთ თითოეულ დამატებულ ობიექტს უნდა ჰქონდეს, carName, carColor, carReleaseDate.
// 5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი მანქანა უნდა იყოს დამატებული cars.json ში.
// როდესაც გამოვიძახებ node car.js show 2020 უნდა გამოაჩინოს მხოლოდ 2020 წლის მანქანები,
//  როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს მხოლოდ წითელი ფერის მანქანები

const fs = require("fs/promises");
const [, , car, year, color] = process.argv;

async function main() {
  const readData = await fs.readFile("cars.json", "utf-8");
  let cars = JSON.parse(readData);

  if (process.argv.length === 4) {
    const [, , operation, param] = process.argv;
    if (operation !== "show") {
      console.log("unkown operation");
      return;
    }

    let res = [];
    if (!isNaN(param)) {
      res = cars.filter((c) => c.carReleaseDate === param);
    } else {
      res = cars.filter((c) => c.carColor === param);
    }
    console.log(res);
    return
  }

  if (process.argv.length === 5) {
    cars.push({
      carName: car,
      carColor: color,
      carReleaseDate: year,
    });
    await fs.writeFile("cars.json", JSON.stringify(cars, null, 2));
  }
}

main();
