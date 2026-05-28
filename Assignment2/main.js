// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სტრინგს და დააბრუნებს ამ სტირნგის აბრივიატურას მაგალითად getAbbr('John Doe') => "J.D"

function getAbbr(str) {
  const words = str.trim().split(" ");
  let res = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 0) {
      continue;
    }
    i === words.length - 1
      ? (res = res.concat(words[i][0]))
      : (res = res.concat(words[i][0] + "."));
  }
  return res;
}

// 2) დაწერეთ ფუნცქია რომელიც არგუმენტად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვების ჯამს მაგ: getSumOfDigit(123) => 6 ახსნა 1 + 2 + 3

function getSumOfDigit(num) {
  if (num === 0) {
    return 0;
  }
  return (num % 10) + getSumOfDigit(Math.floor(num / 10));
}

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს სტრინგს და წაშლის ამ სტრინგიდან ყველა გამეორებად ასოს. მაგ: removeDuplicates('banana') => 'ban

function removeDuplicates(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str.charAt(i)) === i) {
      res += str[i];
    }
  }
  return res;
}

// 4) დაწერეთ ფუნქცია რომელიც წაშლის ყველა სფეისს სტრინგინდან მაგ: removeSpaces('1 2 aab') => '12aab' უნდა გამოიტენოთ for ლუპი
function removeSpaces(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      res = res.concat(str[i]);
    }
  }
  return res;
}

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს წინადადებას და შემოაბრუნებს თითოეულ სიტყვას მაგ: reverseEachWord('Hello World') =>  "olleH dlroW"

function reverseEachWord(str) {
  const words = str.split(" ");
  let res = "";

  for (let i = 0; i < words.length; i++) {
    res = res.concat(reverseWord(words[i]) + " ");
  }
  return res.trim();
}

function reverseWord(w) {
  let rev = "";
  for (let i = 0; i < w.length; i++) {
    rev += w[w.length - i - 1];
  }
  return rev;
}

// console.log(getAbbr(' John   K Rowling'));
// console.log(getSumOfDigit(103));
// console.log(removeDuplicates("bananajb"));
// console.log(removeSpaces('1 2 bb    A  '));
// console.log(reverseEachWord('Hello World'));
