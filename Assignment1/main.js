// 1) დაწერეთ ფუნცქია რომელიც გადააკონვერტირებს ცელსიუს ფარენჰეიტში და დააბრუნებს პასუხს.

function celsiusToFahrenheit(c) {
    return c * 1.8 + 32 
}

// 2) დაწერე თუნცქია რომელიც მიიღებს სტრინგს არგუმენტად და დააბრუნებს ამ სრინგის შებრუნებულს(reverse).
function reverseString(s) {
    let newString = "";
    for(let i = 0; i < s.length; i++) {
        newString += s[s.length - i - 1]
    }
    return newString
}

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით(ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)

function countWords(s) {
    let words = s.split(' ')
    let count = 0

    for(let i = 0; i < words.length; i++){
        if(words[i] != '') {
            count++
        }
    }
    return count
}

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სიტყვას და დააბრუნებს რამდენი ხმოვანია ამ სიტყვაში

function countVowels(w) {
    let count = 0
    let vowels = ["a", "e", "i", "o", "u"]

    for(let i = 0; i < w.length; i++) {
        for(let j = 0; j < vowels.length; j++){
            if(w[i].toLowerCase() === vowels[j]){
                count++
            }
        }
    }
    return count
}

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ ამ რიცხვის ფაქტორიალს
function factorial(f) {
    if (f < 0) {
        return undefined;
    }
    
    if(f == 0){
        return 1
    }
    return f * factorial(f-1)
}

// 6) დაწერეთ ფუნცქია რომლეიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ 0 დან ამ რიცხვამდე მხოლოდ ლუწი რიცხვების ჯამს
function evenSum(n) {
    let sum = 0
    for(let i = 0; i < n; i++){
        if (i % 2 === 0){
            sum += i
        }
    }
    return sum
}

// 7) დაწერეთ ფუნცქია რომელიც მიიღებს სტუდენტის ქულას არგუმენტად და დაგირბუნებთ სტუდენტის შეფასებას A,B,C,E,F
function studentGrade(n) {
    if (n >= 91) {
        return "A"
    } else if (n >= 81) {
        return "B"
    } else if (n >= 71) {
        return "C"
    } else if (n >= 61) {
        return "D"
    } else if (n >= 51) {
        return "E"
    }
    return "F"
}

// 8) დაწერეთ ფუნცქია რომელიც მიიღებს პაროლს პარამეტრად თქვენი მიზანია შეამოწმოთ თუ არის 8 სიმბოლოზე მეტი შეიცავს რიცხვს და ერთი დიდ ასოს(capital letter)

function isGoodPassword(p) {
    return hasGoodLength(p) && containsNumber(p) && containsCapital(p)
}

function hasGoodLength(p) {
    return p.length > 8
}

function containsNumber(p) {
    for(let i = 0; i < p.length; i++) {
        if(p[i] >= '0' && p[i] <= '9'){
            return true
        }
    }
    return false
}

function containsCapital(p) {
    for(let i = 0; i < p.length; i++) {
        if(p[i] >= 'A' && p[i] <= 'Z'){
            return true
        }
    }
    return false
}

// console.log(celsiusToFahrenheit(10))
// console.log(reverseString("გიორგი"));
// console.log(countWords("აი ია"));
// console.log(countVowels("IBAAa"));
// console.log(factorial(5));
// console.log(evenSum(6));
// console.log(studentGrade(52));
// console.log(isGoodPassword("ABCDEq123"));


