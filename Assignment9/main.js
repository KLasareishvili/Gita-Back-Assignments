// 1) Todo App კლასი
// მოთხოვნები: Todo (id, title, isDone, createdAt), TodoList კლასში მეთოდები:
// დაამატე, წაშალე(id), მონიშნე შესრულებული checkActiveTodo(id), დააბრუნე
// Todos(ფილტრი: all/active/done), getAllTodos({active: true}) => actives,
// getAllTodos({active: true}) => not active,
// getAllTodos() => all todos.

class Todo {
  constructor(id, title, isDone, createdAt) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    this.createdAt = createdAt;
  }
}

class TodoList {
  constructor() {
    this.list = [];
  }

  add(todo) {
    this.list.push(todo);
  }

  delete(id) {
    this.list = this.list.filter((t) => t.id !== id);
  }

  checkActiveTodo(id) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        this.list[i].isDone = true;
      }
    }
  }

  getAllTodos(options) {
    if (!options) {
      return this.list;
    }

    return this.list.filter((t) => t.isDone === options.active);
  }
}

// 2) Shoppinc Cart კლასი
// მეთოდები: addToCart(), removeFromCart(), calculateTotalPrice(), updateItem()

class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  addToCart(p) {
    this.cart.push(p);
  }

  removeFromCart(p) {
    this.cart = this.cart.filter((a) => a.id != p.id);
  }

  calculateTotalPrice() {
    return this.cart.reduce((cur, prev) => {
      return cur + prev.price;
    }, 0);
  }

  updateItem(id, p) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === id) {
        this.cart[i] = p;
      }
    }
  }
}

// 3) Library კლასი რომელიც შეინახავს წიგნების მასივს.
// მეთოდები: addBook(), removeBook(), listBooks() ამას შეიძლება გადაეცეს სორტი მაგალითად წამოიღეთ წიგნები გამოშვების წლის მიხედვით.

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  listBooks(sortBy) {
    if (sortBy === "year") {
      return [...this.books].sort((a, b) => a.year - b.year);
    }
    return this.books;
  }
}

// 4) ContactManager კლასი
// უნდა ჰქონდეს შემდეგი მეთოდები:
// addNewContact() // სახელი, ნომერი, იმეილი დაადეთ ვალიდაცია რომ 2 ერთი და იგივე იმეილის კონტაქტი ვერ უნდა შექმნათ,
//  ვერც ორი ერთი და იგივე ნომერი
// viewAllContacts(), updatePhone(), deleteContact()

class ContactManager {
  constructor() {
    this.contacts = [];
  }

  addNewContact(contact) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (
        this.contacts[i].mail === contact.mail ||
        this.contacts[i].number === contact.number
      ) {
        return;
      }
    }
    this.contacts.push(contact);
  }

  viewAllContacts() {
    return this.contacts;
  }

  updatePhone(mail, number) {
    const exists = this.contacts.some((contact) => contact.number === number);
    if (exists) return;

    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].mail === mail) {
        this.contacts[i].number = number;
      }
    }
  }

  deleteContact(mail) {
    this.contacts = this.contacts.filter((contact) => contact.mail !== mail);
  }
}
