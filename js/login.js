document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const authMsg = document.getElementById('authMsg');

  // Check if already logged in
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    authMsg.style.color = "green";
    authMsg.textContent = `Hi ${loggedInUser.name}, you are already logged in. Redirecting...`;
    setTimeout(() => {
      window.location.href =
        loggedInUser.role === 'admin'
          ? "admin-dashboard.html"
          : "customer-dashboard.html"; // ✅ Corrected redirect
    }, 1500);
    return;
  }

  // Login submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      authMsg.style.color = "red";
      authMsg.textContent = "⚠️ Please fill all fields.";
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      authMsg.style.color = "red";
      authMsg.textContent = "❌ Invalid email or password.";
      return;
    }

    // Store logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    authMsg.style.color = "green";
    authMsg.textContent = "✅ Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href =
        user.role === 'admin'
          ? "admin-dashboard.html"
          : "customer-dashboard.html"; // ✅ Correct path
    }, 1500);
  });
});
