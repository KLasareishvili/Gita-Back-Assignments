// 1) წინასწარ შექმენით შემდეგი ტიპის ფოლდერები:
// /Task12
//    test/
//        main.txt
//     test2/
//         main.txt
//     main.js
//      second.txt
// და ჩაწერეთ შიგნით რენდომ ტექსტი თითოეულში თქვენი მიზანია დაწეროთ ფუნცქია რომელიც წაიკითხავს რეკურსიულად ყველა .txt გაფარტოების ფაილს
// და დაგილოგავთ სულ რამდენი სიტყვაა ყველა ფაილში ერთად, პლუს რამდენი, ხმოვანი.

const fs = require("fs/promises");
const path = require("path");

let wordCount = 0;
let vowelCount = 0;

async function countWords(filePath) {
  const dirs = await fs.readdir(filePath);

  for (let dir of dirs) {
    const fullDirPath = path.join(filePath, dir);
    const stat = await fs.stat(fullDirPath);
    if (stat.isDirectory()) {
      await countWords(fullDirPath);
    }
    const ext = await path.extname(fullDirPath);
    if (ext === ".txt") {
      const readData = await fs.readFile(fullDirPath, "utf-8");
      const words = readData.trim().split(/\s+/);
      const totalChars = words.join("");

      const totalVowels = totalChars.split("").reduce((curr, prev) => {
        if (["a", "e", "i", "o", "u", "y"].includes(prev.toLowerCase())) {
          curr += 1;
        }
        return curr;
      }, 0);

      wordCount += words.length;
      vowelCount += totalVowels;
    }
  }
}

async function main() {
  await countWords(__dirname);
  console.log(wordCount);
  console.log(vowelCount);
}

main();
