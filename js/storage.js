// Initialize LocalStorage data if not present
if (!localStorage.getItem("users")) {
  const users = [
    { id: 1, name: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
    { id: 2, name: "Teena", email: "teena@gmail.com", password: "123", role: "customer" }
  ];
  localStorage.setItem("users", JSON.stringify(users));
}

if (!localStorage.getItem("categories")) {
  const categories = [
    { id: 1, name: "Blouse", designs: [ { id: 101, name: "Blouse A", price: 500 }, { id: 102, name: "Blouse B", price: 600 } ] },
    { id: 2, name: "Suit", designs: [ { id: 201, name: "Suit A", price: 1200 } ] },
    { id: 3, name: "Lehenga", designs: [ { id: 301, name: "Lehenga A", price: 2000 } ] }
  ];
  localStorage.setItem("categories", JSON.stringify(categories));
}

if (!localStorage.getItem("appointments")) localStorage.setItem("appointments", JSON.stringify([]));
if (!localStorage.getItem("consultations")) localStorage.setItem("consultations", JSON.stringify([]));
if (!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify([]));
