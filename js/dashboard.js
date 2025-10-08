// dashboard.js

// Check if user is logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  alert("Please login or register to access dashboard.");
  window.location.href = "login.html";
}

// Display user info
const dashboardContainer = document.getElementById('dashboardContainer');
const welcomeUser = document.getElementById('welcomeUser');
welcomeUser.innerText = `Welcome, ${loggedInUser.name}!`;

// Role-based rendering
if (loggedInUser.role === 'customer') {
  renderCustomerDashboard();
} else if (loggedInUser.role === 'admin') {
  renderAdminDashboard();
}

// ================= Customer Dashboard =================
function renderCustomerDashboard() {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const userAppointments = appointments.filter(a => a.user === loggedInUser.email);

  if (userAppointments.length === 0) {
    dashboardContainer.innerHTML = `<p id="noAppointmentsMsg">No appointments yet.</p>`;
    return;
  }

  let tableHTML = `
    <table class="appointment-table">
      <tr>
        <th>Service</th>
        <th>Category</th>
        <th>Design</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
  `;

  userAppointments.forEach(app => {
    tableHTML += `
      <tr>
        <td>${app.service}</td>
        <td>${app.category}</td>
        <td>${app.design}</td>
        <td>${app.date}</td>
        <td>${app.time}</td>
        <td class="status-${app.status.replace(' ', '\\ ')}">${app.status}</td>
      </tr>
    `;
  });

  tableHTML += `</table>`;
  dashboardContainer.innerHTML = tableHTML;
}

// ================= Admin Dashboard =================
function renderAdminDashboard() {
  dashboardContainer.innerHTML = `
    <h3>Manage Categories</h3>
    <div id="categoryManagement"></div>
    <h3>Manage Designs</h3>
    <div id="designManagement"></div>
    <h3>All Appointments</h3>
    <div id="appointmentManagement"></div>
  `;

  manageCategories();
  manageDesigns();
  showAllAppointments();
}

// ================ Admin Functions ==================
function manageCategories() {
  const categoryDiv = document.getElementById('categoryManagement');
  let categories = JSON.parse(localStorage.getItem('categories')) || [];

  let html = `
    <form id="addCategoryForm">
      <input type="text" id="categoryName" placeholder="Category Name" required>
      <input type="text" id="categoryImage" placeholder="Image URL" required>
      <button type="submit" class="btn-primary">Add Category</button>
    </form>
    <ul id="categoryList">
      ${categories.map(c => `<li>${c.name} <button onclick="deleteCategory(${c.id})">Delete</button></li>`).join('')}
    </ul>
  `;
  categoryDiv.innerHTML = html;

  document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('categoryName').value;
    const image = document.getElementById('categoryImage').value;
    const id = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
    categories.push({ id, name, image });
    localStorage.setItem('categories', JSON.stringify(categories));
    manageCategories();
  });
}

function deleteCategory(id) {
  let categories = JSON.parse(localStorage.getItem('categories')) || [];
  categories = categories.filter(c => c.id !== id);
  localStorage.setItem('categories', JSON.stringify(categories));
  manageCategories();
}

function manageDesigns() {
  const designDiv = document.getElementById('designManagement');
  let designs = JSON.parse(localStorage.getItem('designs')) || [];
  let categories = JSON.parse(localStorage.getItem('categories')) || [];

  let html = `
    <form id="addDesignForm">
      <input type="text" id="designName" placeholder="Design Name" required>
      <select id="designCategory">
        ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
      </select>
      <input type="text" id="designImage" placeholder="Image URL" required>
      <button type="submit" class="btn-primary">Add Design</button>
    </form>
    <ul id="designList">
      ${designs.map(d => `<li>${d.name} (${categories.find(c => c.id === d.categoryId)?.name || ''}) <button onclick="deleteDesign(${d.id})">Delete</button></li>`).join('')}
    </ul>
  `;
  designDiv.innerHTML = html;

  document.getElementById('addDesignForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('designName').value;
    const categoryId = parseInt(document.getElementById('designCategory').value);
    const image = document.getElementById('designImage').value;
    const id = designs.length > 0 ? designs[designs.length - 1].id + 1 : 1;
    designs.push({ id, name, categoryId, image });
    localStorage.setItem('designs', JSON.stringify(designs));
    manageDesigns();
  });
}

function deleteDesign(id) {
  let designs = JSON.parse(localStorage.getItem('designs')) || [];
  designs = designs.filter(d => d.id !== id);
  localStorage.setItem('designs', JSON.stringify(designs));
  manageDesigns();
}

function showAllAppointments() {
  const appointmentDiv = document.getElementById('appointmentManagement');
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  if (appointments.length === 0) {
    appointmentDiv.innerHTML = `<p>No appointments yet.</p>`;
    return;
  }

  let html = `
    <table class="appointment-table">
      <tr>
        <th>User</th>
        <th>Service</th>
        <th>Category</th>
        <th>Design</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
      ${appointments.map(a => `
        <tr>
          <td>${a.user}</td>
          <td>${a.service}</td>
          <td>${a.category}</td>
          <td>${a.design}</td>
          <td>${a.date}</td>
          <td>${a.time}</td>
          <td class="status-${a.status.replace(' ', '\\ ')}">${a.status}</td>
        </tr>
      `).join('')}
    </table>
  `;
  appointmentDiv.innerHTML = html;
}
