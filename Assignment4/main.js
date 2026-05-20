//1) წაშალეთ მასივის თითოეულ ელემენტს წაუშლის ბოლო სიმბოლოს მაგ: ["one","two","three"] => ["on","tw","thre"]

const elems = ["one","two","three"]

const elems2 = elems.map((elem) => {
    return elem.slice(0, elem.length-1)
})

// console.log(elems2, "elems");

// 2) იპოვეთ მასივში 2 ყველაზე პატარა ელემენტის ჯამი, მაგ: [19,5,42,2,77] => 7
const nums = [19,5,42,2,77]

const sum = nums.sort((a, b) => a - b).slice(0, 2).reduce((prev, curr) => { return prev + curr}, 0)

// console.log(sum);

// 3) გამოთვალეთ მასივის რიცხვების ჯამი ForEach ის გამოყენებით მაგ: [10, 12, 4, 2] => 28

const arr = [10, 12, 4, 2]
let arrSum = 0
arr.forEach((num, i) => {
    arrSum += num
})
// console.log(arrSum);

// 4) დაამუშავეთ მასივი რომ დააბრუნოს სტინგი მხოლოდ იმ ელემენტებით რომლის სიგრძე არის 5-ზე მეტი და შეაწებეთ #-ით 
// მაგ: ["cat","parrot","dog","elephant"] => "PARROT#ELEPHANT"
const array = ["cat","parrot","dog","elephant"]

let str = array.filter((num) => num.length > 5).reduce((prev, curr) => {
    return prev.toUpperCase() + "#" + curr.toUpperCase()
}, "").slice(1)
 
// console.log(str);

// 5) დააჯგუფეთ მასივი კლასის მიხედვით და გამოითვალეთ საშუალო ქულა, მაგ: 
// [
//   { name: "Ann",  cls: "A", grade: 90 },
//   { name: "Ben",  cls: "B", grade: 75 },
//   { name: "Cara", cls: "A", grade: 80 }
// ]
// შედეგი: {"A": 85, "B" 75}

const obj = [
  { name: "Ann",  cls: "A", grade: 90 },
  { name: "Ben",  cls: "B", grade: 75 },
  { name: "Cara", cls: "A", grade: 80 }
]

let grouped = obj.reduce((prev, curr) => {
    if(!prev[curr.cls]) {
        prev[curr.cls] = [curr.grade, 1]
    } else {
        prev[curr.cls][0] += curr.grade
        prev[curr.cls][1] += 1
    }
    return prev
}, {})

for (const key in grouped) {
  grouped[key] = grouped[key][0] / grouped[key][1];
}

// console.log(grouped);


