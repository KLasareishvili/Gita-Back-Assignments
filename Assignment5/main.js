// 1) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი, 1 - ობიექტი, 
// 2- ფროფერთი რომელიც გინდათ რომ წაშალოს, 
// ეს ფუნქცია დააბრუნებს ობიექტს რომელშიც წაშლილი იქნება ის ფროფერთი რასაც გადასცემთ.

function deleteProperty(obj, prop) {
    delete obj[prop]
    return obj
}


// 2) მოცემული გაქვთ მასივი  
const arr =
[
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 }
] 
// თქვენი მიზანია დაწეროთ ფუნცქია რომელიც არგუმენტად მიიღებს ამ მასივს და დააბრუნებს ლიდერბორდს ქულების მიხედვით. შედეგი: [
//   { name: 'Nika', score: 80, rank: 1 },
//   { name: 'Luka', score: 70, rank: 2 },
//   { name: 'Ana',  score: 50, rank: 3 }
// ]

function rank(arr) {
    arr.sort((a,b) => b.score - a.score).forEach((a, idx) => a.rank = idx + 1)
    return arr
}

// console.log(rank(arr));

// 3) დაწერეთ ფუნცქია რომელიც დააბრუნებს მხოლოდ იმ ობიექტს რომლის სათაურიც ყველაზე გრძელია. მაგ: [
//   { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
// ] =>   { title: "The Lord of the Rings", year: 2001 }

function finLongestTitle(arr) {
    return arr.sort((a,b) => b.title.length - a.title.length)[0]
}

// 4) დაწერეთ ფუნქცია რომელიც გამოითვლის საშუალო ასაკს თითოეულ დეპარტამენტის და დააბრუნებს შესაბამის ობიექტს. მაგ: 
// [
//   { name: "Ana", dept: "HR", age: 25 },
//   { name: "Nika", dept: "IT", age: 30 },
//   { name: "Luka", dept: "IT", age: 22 }
// ]
// . => { HR: 25, IT: 26 }

function findAvgAge(arr) {
    let obj = arr.reduce((prev, curr) => {
        if(!prev[curr.dept]){
            prev[curr.dept] = [curr.age, 1]
        } else {
            prev[curr.dept][0] += curr.age
            prev[curr.dept][1] += 1
        }
        return prev
    }, {})

    for(let key in obj){
        obj[key] = obj[key][0] / obj[key][1]
    }
    return obj
}


// console.log(
//     findAvgAge([
//         { name: "Ana", dept: "HR", age: 25 },
//         { name: "Nika", dept: "IT", age: 30 },
//         { name: "Luka", dept: "IT", age: 22 }
//     ]));

// 5) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს კომენტარების მასივს და დააბრუნებს სიტყვების რაოდენობას მაგ: [
//   { id:1, comment:"Hello world" }, 
//   { id:2, comment:"This is great!" },
//   { id:3, comment:"" }
// ] => 5 ანუ შეკრიბა ყველა კომენტარის სიტყვების რაოდენობა

function numWords(str) {
    return str.trim().split(/\s+/).filter(Boolean).length
}

function countWords(comments) {
    return comments.reduce((prev, curr) => {
        return prev + numWords(curr.comment)
    }, 0)
}

// 6) დაწერეთ ფუნქცია, რომელიც users-ს დააჯგუფებს department-ის მიხედვით. თითოეულ ჯგუფში users უნდა დალაგდეს salary-ის კლებადობით.
// let users = [
//   { name: "Ana", department: "HR", salary: 2000 },
//   { name: "Nika", department: "IT", salary: 5000 },
//   { name: "Luka", department: "IT", salary: 3500 },
//   { name: "Mariam", department: "HR", salary: 3000 }
// ] 
// შედეგი {
//   HR: [
//     { name: "Mariam", department: "HR", salary: 3000 },
//     { name: "Ana", department: "HR", salary: 2000 }
//   ],
//   IT: [
//     { name: "Nika", department: "IT", salary: 5000 },
//     { name: "Luka", department: "IT", salary: 3500 }
//   ]
// }

function groupByDepAndSort(users) {
    return users.sort((a,b) => b.salary - a.salary).reduce((prev,curr) => {
        if(!prev[curr.department]){
            prev[curr.department] = [curr]
        } else {
            prev[curr.department].push(curr)
        }
        return prev
        
    }, {})
}

// console.log(groupByDepAndSort(users));


// 7) დაწერეთ ფუნქცია, რომელიც მიიღებს cart მასივს და დააბრუნებს საბოლოო ფასს.
// [
//   { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
//   { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
//   { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 }
// ] შედეგი: 1980

function countFinalCost(cart) {
    return cart.reduce((prev, curr) => {
        prev += curr.price * curr.quantity * ((100 - curr.discountPercent) / 100)
        return prev 
    }, 0)
}

// 8) დაწერეთ ფუნქცია, რომელიც users მასივს გადააქცევს ობიექტად.
// [
//   { id: 1, name: "Ana", age: 25 },
//   { id: 2, name: "Nika", age: 30 },
//   { id: 3, name: "Luka", age: 22 }
// ]
// შედეგი: 
// {
//   1: { id: 1, name: "Ana", age: 25 },
//   2: { id: 2, name: "Nika", age: 30 },
//   3: { id: 3, name: "Luka", age: 22 }
// }

function transformToObj(users) {
    let obj = {}
    for(let i = 0; i < users.length; i++){
        obj[users[i].id] = users[i]
    }
    return obj
}