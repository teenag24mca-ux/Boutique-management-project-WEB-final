// js/register.js
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const messageBox = document.createElement('p');
  messageBox.classList.add('success-msg'); // same style as booking/login success messages
  messageBox.style.display = 'none';
  registerForm.appendChild(messageBox);

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    if (!name || !email || !password || !role) {
      messageBox.textContent = "Please fill all fields.";
      messageBox.style.color = 'red';
      messageBox.style.display = 'block';
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      messageBox.textContent = "Email already registered. Please login.";
      messageBox.style.color = 'red';
      messageBox.style.display = 'block';
      return;
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    messageBox.textContent = "Registration successful! Redirecting...";
    messageBox.style.color = '#16a34a'; // green success
    messageBox.style.display = 'block';

    setTimeout(() => {
      if (role === 'admin') window.location.href = "admin-dashboard.html";
      else window.location.href = "dashboard.html";
    }, 1500);
  });
});
