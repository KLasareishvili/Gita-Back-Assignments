// 1) დაწერეთ ფუნქცია რომელიც წამოიღებს დეითას ამ საიტიდან https://jsonplaceholde.typicode.com,
// url სპეციალურად არის არასწორი თქვენი მიზანია რომ როდესაც რექუსთი დაფეილდება გააკეთოთ რეთრაი 5 ჯერ.

async function fetchData() {
  for (let i = 0; i < 5; i++) {
    try {
      let resp = await fetch("https://jsonplaceholde.typicode.com");
      let data = await resp.json();

      console.log(data, "Data");
      return data;
    } catch (error) {
      //   console.log(error);
    }
  }
}

// fetchData();

// 2) დაწერეთ ფუნცქია რომელიც წამოიღებს მონაცემებს ამ ორი url-დან https://dummyjson.com/users და
// https://jsonplaceholder.typicode.com/users თქვენი მიზანია დალოგოთ მხოლოდ ის რომელიც მოასწრებს დარიზოლვებას.

async function race() {
  const resp = await Promise.race([
    fetch("https://dummyjson.com/users"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ]);
  const data = await resp.json();

  console.log(data, "data");
}

// race()

// 3) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას https://dummyjson.com/products ამ url-დან,
// შემდეგ გაფილტავას და დალოგავს მხოლოდ იმ პროდუქტებს რომელთა ფასიც არის 10-ზე მეტი

async function fetchAndFilter() {
  const resp = await fetch("https://dummyjson.com/products");
  const data = await resp.json();

  let filteredData = data.products.filter((p) => p.price > 10);
  console.log(filteredData);
}

// fetchAndFilter()

// 4) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას ამ url-დან https://dummyjson.com/users,
// გაფილტრავს მხოლოდ ისეთ იუზერებს რომელთა პროფესია არის web developer და დალოგავს მხოლოდ შემდეგ ფროფერთებს:
// სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.

async function fetchUsers() {
  const resp = await fetch("https://dummyjson.com/users");
  const data = await resp.json();

  const filteredData = data.users.filter(
    (user) => user.company.title === "Web Developer",
  );

  let finalData = [];
  filteredData.forEach((user) => {
    finalData.push({
      FirstName: user.firstName,
      LastName: user.lastName,
      "Address(city)": user.address.city,
      Email: user.email,
      Phone: user.phone,
    });
  });
  console.log(finalData);
}
// fetchUsers();

// 5) დაწერეთ ფუნქცია რომელიც წამოიღებს იმფორმაციას ერთდროულად შემდეგი
// api-დან: https://dummyjson.com/recipes, https://dummyjson.com/comments, https://dummyjson.com/todos,
// https://dummyjson.com/quotes და ყველას დარიზოლვებულ და ჯეისონში გადმოტრანსფორმირებულ შედეგებს დალოგავთ.
// აუცილებელია რომ ყველა გაეშვას ერთდროულად
async function concurrentFetch() {
  const [resp1, resp2, resp3, resp4] = await Promise.all([
    fetch("https://dummyjson.com/recipes"),
    fetch("https://dummyjson.com/comments"),
    fetch("https://dummyjson.com/todos"),
    fetch("https://dummyjson.com/quotes"),
  ]);
  const [data1, data2, data3, data4] = await Promise.all([
    resp1.json(),
    resp2.json(),
    resp3.json(),
    resp4.json(),
  ]);

  console.log(data1);
  console.log(data2);
  console.log(data3);
  console.log(data4);
}

concurrentFetch()
