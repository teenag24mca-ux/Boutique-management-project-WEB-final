document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Redirect if not logged in
  if (!loggedInUser) {
    alert("Please login or register to book an appointment.");
    window.location.href = "login.html";
    return;
  }

  // Display user's name
  document.getElementById('userGreeting').textContent = `Hello, ${loggedInUser.name} - Book Your Appointment`;

  // Get dropdown elements
  const serviceSelect = document.getElementById('service');
  const categorySelect = document.getElementById('category');
  const designSelect = document.getElementById('design');
  const categoryDiv = document.getElementById('categoryDiv');
  const designDiv = document.getElementById('designDiv');

  // Fetch data from localStorage
  const getServices = () => JSON.parse(localStorage.getItem('services')) || [
    { id: 1, name: 'New Cloth' },
    { id: 2, name: 'Alteration' },
    { id: 3, name: 'Saree Falls' },
    { id: 4, name: 'Consultation' }
  ];

  const getCategories = () => JSON.parse(localStorage.getItem('categories')) || [];
  const getDesigns = () => JSON.parse(localStorage.getItem('designs')) || [];

  // Populate services dropdown
  function populateServices() {
    const services = getServices();
    serviceSelect.innerHTML = '<option value="">--Select Service--</option>';
    services.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      serviceSelect.appendChild(opt);
    });
  }

  // Populate categories dropdown
  function populateCategories() {
    const categories = getCategories();
    categorySelect.innerHTML = '<option value="">--Select Category--</option>';
    categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      categorySelect.appendChild(opt);
    });
  }

  // Populate designs based on selected category
  function populateDesigns(selectedCategoryId) {
    const designs = getDesigns().filter(d => d.categoryId == selectedCategoryId);
    designSelect.innerHTML = '<option value="">--Select Design--</option>';
    designs.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.name;
      opt.textContent = d.name;
      designSelect.appendChild(opt);
    });
  }

  // Initially populate services
  populateServices();

  // Hide category/design by default
  categoryDiv.style.display = 'none';
  designDiv.style.display = 'none';

  // Show/hide category & design based on service
  serviceSelect.addEventListener('change', () => {
    if (serviceSelect.value === 'New Cloth') {
      categoryDiv.style.display = 'block';
      designDiv.style.display = 'block';
      populateCategories(); // always refresh with latest data
    } else {
      categoryDiv.style.display = 'none';
      designDiv.style.display = 'none';
    }
  });

  // When category changes, show designs under it
  categorySelect.addEventListener('change', () => {
    populateDesigns(categorySelect.value);
  });

  // Handle form submission
  document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const appointment = {
      user: loggedInUser.name,
      email: loggedInUser.email,
      service: serviceSelect.value,
      category: serviceSelect.value === 'New Cloth'
        ? categorySelect.options[categorySelect.selectedIndex]?.text
        : '',
      design: serviceSelect.value === 'New Cloth'
        ? designSelect.options[designSelect.selectedIndex]?.text
        : '',
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      status: 'Pending'
    };

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Success message
    const successMsg = document.querySelector('.success-msg');
    successMsg.style.display = 'block';
    setTimeout(() => successMsg.style.display = 'none', 4000);

    document.getElementById('bookingForm').reset();
    categoryDiv.style.display = 'none';
    designDiv.style.display = 'none';
  });

  // 🔄 Auto-update when admin adds/removes categories or designs
  window.addEventListener('storage', (e) => {
    if (['categories', 'designs'].includes(e.key)) {
      if (serviceSelect.value === 'New Cloth') {
        populateCategories();
        if (categorySelect.value) populateDesigns(categorySelect.value);
      }
    }
  });
});
