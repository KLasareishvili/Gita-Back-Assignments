// 2) შექმენით phone.js და contacts.json ფაილები, თქვენი მიზანია შექმნათ phone cli თული რომელსაც ქნება
// დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი.
// node phone.js add 555151515 nika უნდა დაემატოს ეს ნომერი contacts.json ში.
// გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს არ დაამატოს იგივე ნომერი.
// წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან.
// node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.

const fs = require("fs/promises");
const [, , operation, number, name] = process.argv;

async function main() {
  const readData = await fs.readFile("contacts.json", "utf-8");
  let contacts = JSON.parse(readData);

  const alreadyExists = contacts.reduce((prev, curr) => {
    return prev || curr.number === number;
  }, false);

  if (operation === "add") {
    if (alreadyExists) {
      console.log("Number already exists");
      return;
    }

    contacts.push({
      name: name,
      number: number,
    });

    await fs.writeFile("contacts.json", JSON.stringify(contacts, null, 2));
  } else if (operation === "delete") {
    if (!alreadyExists) {
      console.log("Number does not exist");
      return;
    }

    let newContacts = contacts.filter((c) => c.number !== number);
    await fs.writeFile("contacts.json", JSON.stringify(newContacts, null, 2));
  } else if (operation === "show") {
    console.log(contacts);
  }
}

main();
