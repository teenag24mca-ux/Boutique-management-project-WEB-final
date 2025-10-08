document.addEventListener('DOMContentLoaded', () => {
  const navList = document.querySelector('.navbar ul');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const createNavLink = (href, text, isActive = false) => {
    return `<li><a href="${href}" ${isActive ? 'class="active"' : ''}>${text}</a></li>`;
  };

  if (loggedInUser) {
    // 🧩 Check user role
    const userRole = loggedInUser.role; // 'admin' or 'user'

    // Build navbar dynamically
    navList.innerHTML = `
      ${createNavLink('index.html', 'Home')}
      ${createNavLink('categories.html', 'Categories')}
      ${userRole !== 'admin' ? createNavLink('booking.html', 'Book Appointment') : ''}
      ${createNavLink('customer-dashboard.html', 'Dashboard')}
      ${createNavLink('about.html', 'About Us')}
      ${createNavLink('contact.html', 'Contact')}
      <li><span class="navbar-username">Hi, ${loggedInUser.name}</span></li>
      <li><button id="logoutBtn" class="btn-logout">Logout</button></li>
    `;

    // 🔒 Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });

  } else {
    // 🚪 For visitors (not logged in)
    navList.innerHTML = `
      ${createNavLink('index.html', 'Home')}
      ${createNavLink('categories.html', 'Categories')}
      ${createNavLink('booking.html', 'Book Appointment')}
      ${createNavLink('about.html', 'About Us')}
      ${createNavLink('contact.html', 'Contact')}
      ${createNavLink('login.html', 'Login')}
      ${createNavLink('register.html', 'Register')}
    `;
  }
});
