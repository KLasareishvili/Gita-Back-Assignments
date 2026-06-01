// 1) დაწერეთ ფუნცქია რომელიც დალოგავს მაუსის კოორდინატებს მხოლოდ მას შემდეგ რაც მაუსი გაჩერდება,
// გამოიყენეთ debaunce ტექნიკა. მინიშნება: window.addEventListener('mousemove',(e) => {
// console.log(e.clientX, e.clientY)
// })

function debounce(callback, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, ms);
  };
}

function logMouseCoordinates() {
  window.addEventListener(
    "mousemove",
    debounce((e) => {
      console.log(e.clientX, e.clientY);
    }, 300),
  );
}

logMouseCoordinates();
// 2) შექმენით html-ში ბათონი და ყოველ ბათონის ქლიქზე დაარექუესთეთ შემდეგი API-დან და მიღებული შედეგი გამოაჩნიეთ
// https://dummyjson.com/quotes ისევე როგორც რენდომ კატის ფაქტზე ვქენით.
const button = document.querySelector("button");
const quotesContainer = document.querySelector(".quotesContainer");

button.addEventListener("click", async () => {
  const resp = await fetch("https://dummyjson.com/quotes");
  const data = await resp.json();

  const randomQuote =
    data.quotes[Math.floor(Math.random() * data.quotes.length)];

  showQuotes([randomQuote]);
});

async function showQuotes(quotes) {
  quotesContainer.innerHTML = "";
  quotes.forEach((q) => {
    const quoteDiv = document.createElement("div");
    const quoteText = document.createElement("h1");
    quoteText.textContent = q.quote;

    quoteDiv.style.border = "2px solid black";
    quoteDiv.appendChild(quoteText);
    quotesContainer.appendChild(quoteDiv);
  });
}
// 3) დაწერეთ ფუნცქია რომელიც წამოიღებს იუზერების ინფორმაციას შემდეგი API-დან https://dummyjson.com/users თქვენი მიზანია
// გააკეთოთ ფეჯინეიშენი სულ არის 200-ზე მეტი იუზერი და დიფოტად მოდის 30. მინიშნება, თუ სრულ რაოდენობას გაყოფთ ლიმიტზე
// მიიღებთ ფეიჯების რაოდენობას, რაც შეეხება როგორ უნდა გამოთვალოთ skip ფროფერთი. skip = (page - 1) * limit) limit = 30

let page = 1;
const limit = 30;
const usersContainer = document.querySelector(".usersContainer");

async function getUsers(page) {
  const skip = (page - 1) * limit;

  const resp = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
  );

  const data = await resp.json();
  drawUsers(data.users);
}

function drawUsers(users) {
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    const userName = document.createElement("h1");
    const userEmail = document.createElement("h2");
    const userAge = document.createElement("h1");

    userName.textContent = `Name: ${user.firstName} ${user.lastName}`;
    userEmail.textContent = `Email: ${user.email}`;
    userAge.textContent = `Age: ${user.age}`;

    userDiv.appendChild(userName);
    userDiv.appendChild(userEmail);
    userDiv.appendChild(userAge);

    userDiv.style.border = "2px solid black";

    usersContainer.appendChild(userDiv);
  });
}

const nextButton = document.querySelector(".nextButton");
const prevButton = document.querySelector(".prevButton");

nextButton.addEventListener("click", () => {
  page++;
  getUsers(page);
});

prevButton.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  page--;
  getUsers(page);
});

getUsers(page);

// 4) შექმენით ინფუთი სადაც იუზერი მხოლოდ რიცხვებს შეიყვანს, რიცხვის შეყვანის შემდეგ უნდა დაარექუესთოთ შემდეგ ეიპიაიზე
// https://myfakeapi.com/api/cars/10 10-ის ნაცვლად ჩაწერეთ იუზერის შეყვანილი ინფომრაცია, ეს ეიპიაი დაგიბრუნებთ
// მანქანის ინფორმაციას და გამოაჩინეტ ეს ინფორმაცია დომში. ასევე თუ არასწორი აიდი დაწერა მაგალითად 9999 ბექენდი
// დაგირტყავთ ერორს და გაჰენდლეთ ერორი და უთხარით იუზერს რომ სწორი აიდი შეიყვანოს, მაგალითად alert ის გამოყენებით.
const input = document.querySelector("input");
input.addEventListener("change", (e) => {
  getFakeData(e.target.value);
});

async function getFakeData(number) {
  const resp = await fetch(`https://myfakeapi.com/api/cars/${number}`);

  if (!resp.ok) {
    alert("Wrong ID");
    return;
  }
  const data = await resp.json();

  showCar(data.Car);
}

const carContainer = document.querySelector(".carContainer");
function showCar(car) {
  carContainer.innerHTML = "";

  const carDiv = document.createElement("div");
  const carName = document.createElement("h1");
  const carModel = document.createElement("h2");
  const carPrice = document.createElement("h1");

  carName.textContent = `Car: ${car.car}`;
  carModel.textContent = `Model: ${car.car_model}`;
  carPrice.textContent = `Price: ${car.price}`;

  carDiv.appendChild(carName);
  carDiv.appendChild(carModel);
  carDiv.appendChild(carPrice);

  carDiv.style.border = "2px solid black";

  carContainer.appendChild(carDiv);
}
