// 1) დაწერეთ ფუნცქცია რომელიც მიიღებს მასივს არგუმენტად და დააბრუნებს ამ მასივის საშუალო არითმეტიკულს.
function arithmetic(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length
}

// 2) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის შებრუნებულ მასივს თითოეული წევრით. 
// მაგ: 35231 → [1,3,2,5,3]. 0 => [0]

function reverseNumber(num) {
    if (num === 0) {
        return [0]
    }

    let arr = []
    while(num > 0) {
        arr.push(num % 10)
        num = Math.floor(num / 10)
    }
    return arr
}

// 3) დაწერეთ ფუნქცია რომელიც მიიღებს 2 მასივს არგუმენტად და დააბრუნებს მასივის მხოლოდ იმ წევრებს რომელსაც მეორე მასივი არ შეიცავს 
// მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].

function uniqueArrNums(arr1, arr2) {
    let res = []
    for(let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            res.push(arr1[i])
        }
    }
    return res
}

// 4) დაწერეთ ფუნცქცია რომელსაც გადმოეცემა მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. მაგ: [10, 40, 20, 5, 30] => 30

function secondMax(arr) {
    if (arr.length < 2) {
        return undefined
    }
    let max = -Infinity 
    let secondMax = max

    for(let i = 0; i < arr.length; i++) {
        if (arr[i] >= max) {
            secondMax = max
            max = arr[i]
        } else if (arr[i] > secondMax) {
            secondMax = arr[i]
        }
    }

    return secondMax
}

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ იმ სიტყვების მასივი რომლებიც არის პალინდორმი: 
// * პალინდორმი ეწოდება სიტყვას რომელიც შემობრუნების შემდეგ იგივე მნიშვნელობას ინარჩუნებს. 
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]

function filterPalindromes(arr) {
    let res = []

    for (let i = 0; i < arr.length; i++) {
        if (isPalindrome(arr[i])) {
            res.push(arr[i])
        }
    }

    return res
}

function isPalindrome(str) {
    for(let i = 0; i < str.length; i++) {
        if(str[i] !== str[str.length-1-i]) {
            return false
        }
    }
    return true
}

// 6)დაწერეთ ფუნცქია რომელიც მიიღებს რიცხვების მასივს და დააბრუნებთ რომელია ყველაზე ხშირად გამეორებადი რიცხვი მაგ: [4, 5, 6, 5, 4, 5] => 5

function mostFrequentNumber(nums) {
    if(nums.length === 0) {
        return undefined
    }

    let freqs = {}
    let maxFreq = 1
    let mostFreqNum = nums[0]

    for (let i = 0; i < nums.length; i++) {
        if(!freqs[nums[i]]) {
            freqs[nums[i]] = 1
        } else {
            freqs[nums[i]] += 1
            if (freqs[nums[i]] > maxFreq) {
                maxFreq = freqs[nums[i]]
                mostFreqNum = nums[i]
            }
        }
    }
    return mostFreqNum
}

// console.log(reverseNumber(35231))
// console.log(uniqueArrNums([1,2,2,2,3], [2]));
// console.log(secondMax([1,100, 50, 10, 40, 20, 5, 30, 41]));
// console.log(filterPalindromes(["mom", "car", "level", "dog"]));
// console.log(mostFrequentNumber([4, 5, 6, 5, 4, 5, 6, 6, 6]));



