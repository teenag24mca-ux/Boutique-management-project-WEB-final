document.addEventListener("DOMContentLoaded", () => {
  const categoryForm = document.getElementById("categoryForm");
  const designForm = document.getElementById("designForm");
  const categoryList = document.getElementById("categoryList");
  const designList = document.getElementById("designList");
  const designCategory = document.getElementById("designCategory");
  const appointmentsList = document.getElementById("appointmentsList");

  // ✅ Utility: Convert image to Base64
  function getBase64(file, callback, errorCallback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.onerror = () => errorCallback("Error reading file!");
    reader.readAsDataURL(file);
  }

  // ✅ Load Categories
  function loadCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    categoryList.innerHTML = "";
    designCategory.innerHTML = `<option value="">Select Category</option>`;

    categories.forEach((cat, index) => {
      const div = document.createElement("div");
      div.className = "item-card";
      div.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}">
        <p>${cat.name}</p>
        <button onclick="deleteCategory(${index})">Delete</button>
      `;
      categoryList.appendChild(div);

      const opt = document.createElement("option");
      opt.value = cat.name;
      opt.textContent = cat.name;
      designCategory.appendChild(opt);
    });
  }

  // ✅ Add Category
  categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("categoryName").value.trim();
    const file = document.getElementById("categoryImage").files[0];

    if (!name || !file) return alert("Please enter all details!");

    getBase64(file, (base64Image) => {
      const categories = JSON.parse(localStorage.getItem("categories")) || [];
      // Prevent duplicates
      if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert("Category name already exists!");
        return;
      }
      categories.push({ name, image: base64Image });
      localStorage.setItem("categories", JSON.stringify(categories));
      categoryForm.reset();
      loadCategories();
      alert("Category added successfully!");
    }, (err) => alert(err));
  });

  // ✅ Delete Category
  window.deleteCategory = (index) => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const removedCategory = categories[index].name;

    // Remove designs belonging to this category
    const designs = JSON.parse(localStorage.getItem("designs")) || [];
    const updatedDesigns = designs.filter(d => d.category !== removedCategory);
    localStorage.setItem("designs", JSON.stringify(updatedDesigns));

    // Remove the category
    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    loadCategories();
    loadDesigns();
  };

  // ✅ Load Designs
  function loadDesigns() {
    const designs = JSON.parse(localStorage.getItem("designs")) || [];
    designList.innerHTML = "";

    designs.forEach((dsg, index) => {
      const div = document.createElement("div");
      div.className = "item-card";
      div.innerHTML = `
        <img src="${dsg.image}" alt="${dsg.name}">
        <p><strong>${dsg.name}</strong> (${dsg.category})</p>
        <button onclick="deleteDesign(${index})">Delete</button>
      `;
      designList.appendChild(div);
    });
  }

  // ✅ Add Design (Robust Version)
  designForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("designCategory").value;
    const name = document.getElementById("designName").value.trim();
    const file = document.getElementById("designImage").files[0];

    if (!category || !name || !file) return alert("Please fill all details!");

    // Validate category exists
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    if (!categories.some(c => c.name === category)) {
      return alert("Selected category does not exist!");
    }

    getBase64(file, (base64Image) => {
      const designs = JSON.parse(localStorage.getItem("designs")) || [];

      // Prevent duplicate designs
      if (designs.some(d => d.name.toLowerCase() === name.toLowerCase() && d.category === category)) {
        return alert("Design already exists in this category!");
      }

      designs.push({ category, name, image: base64Image });
      localStorage.setItem("designs", JSON.stringify(designs));

      loadDesigns();
      designForm.reset();
      alert("Design added successfully!");
    }, (err) => alert(err));
  });

  // ✅ Delete Design
  window.deleteDesign = (index) => {
    const designs = JSON.parse(localStorage.getItem("designs")) || [];
    designs.splice(index, 1);
    localStorage.setItem("designs", JSON.stringify(designs));
    loadDesigns();
  };

  // ✅ Load Appointments
  function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointmentsList.innerHTML = "";

    if (appointments.length === 0) {
      appointmentsList.innerHTML = "<p>No appointments yet.</p>";
      return;
    }

    appointments.forEach(app => {
      const div = document.createElement("div");
      div.className = "appointment-card";
      div.innerHTML = `
        <p><strong>${app.name}</strong> (${app.email})</p>
        <p><b>Date:</b> ${app.date}</p>
        <p><b>Service:</b> ${app.category}</p>
      `;
      appointmentsList.appendChild(div);
    });
  }

  // ✅ Load Feedbacks
  function loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const tbody = document.querySelector("#feedbackTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (feedbacks.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No feedback yet</td></tr>`;
      return;
    }

    feedbacks.forEach(fb => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${fb.name}</td>
        <td>${fb.email}</td>
        <td>${fb.message}</td>
        <td>${fb.date}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ✅ Initialize everything
  loadCategories();
  loadDesigns();
  loadAppointments();
  loadFeedbacks();
});
