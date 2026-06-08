// 1) წამოიღეთ ინფომრაცია ამ API-დან  https://jsonplaceholder.typicode.com/users და
// მირებული შედეგი ჩაწერეთ users.json ში ოღონდ იუზერებს უნდა ქონდეთ
// მხოლოდ id, name, username და email

const fs = require("fs/promises");

async function task1() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await resp.json();

  let usersInfo = [];

  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    usersInfo.push({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  }

  await fs.writeFile("users.json", JSON.stringify(usersInfo, null, 2));
}

// task1();

// 4) შექმენით ფაილი random.txt შიგნით დაწერეთ რაიმე წინადადება თქვენი მიზანია დაითვალოთ რამდენი სიტყვა,
// რამდენი ხმოვანი და რამდენი ასოა ამ ფაილში და ჩაწეროთ შედეგი result.json ში შემდეგი სახით  {word: 20, vowel: 64, chars: 152}
async function task4(sentence) {
  await fs.writeFile("random.txt", sentence);
  const readData = await fs.readFile("random.txt", "utf-8");

  const words = readData.trim().split(/\s+/);
  const totalChars = words.join("");

  const totalVowels = totalChars.split("").reduce((curr, prev) => {
    if (["a", "e", "i", "o", "u", "y"].includes(prev.toLowerCase())) {
      curr += 1;
    }
    return curr;
  }, 0);

  await fs.writeFile(
    "result.json",
    JSON.stringify({
      word: words.length,
      vowel: totalVowels,
      chars: totalChars.length,
    }),
  );
}

task4("There will be blood")