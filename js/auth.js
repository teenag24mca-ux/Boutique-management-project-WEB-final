// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email exists
    const exist = users.some(u => u.email === email);
    if (exist) {
      alert("Email already registered!");
      return;
    }

    const id = users.length ? users[users.length-1].id + 1 : 1;
    const newUser = { id, name, email, password, role: "customer" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.role === "admin") {
        window.location.href = "admin/admin-dashboard.html";
      } else {
        window.location.href = "customer-dashboard.html";
      }
    } else {
      alert("Invalid credentials!");
    }
  });
}
