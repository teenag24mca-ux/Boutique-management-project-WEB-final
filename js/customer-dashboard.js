document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser || loggedInUser.role !== 'customer') {
    alert("Please login as a customer to access the dashboard.");
    window.location.href = "login.html";
    return;
  }

  // Welcome message
  document.getElementById('welcomeMsg').textContent = `Hi, ${loggedInUser.name}! Welcome to your Dashboard`;

  // Sample data
  const services = JSON.parse(localStorage.getItem('services')) || [
    { id: 1, name: 'New Cloth' },
    { id: 2, name: 'Alteration' },
    { id: 3, name: 'Saree Falls' },
    { id: 4, name: 'Consultation' }
  ];
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const designs = JSON.parse(localStorage.getItem('designs')) || [];

  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments = appointments.filter(appt => appt.email === loggedInUser.email);

  const appointmentsTableBody = document.querySelector('#appointmentsTable tbody');

  // Render appointments
  const renderAppointments = (filter = 'all') => {
    appointmentsTableBody.innerHTML = '';
    const filteredAppointments = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

    if (filteredAppointments.length === 0) {
      appointmentsTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No appointments found.</td></tr>`;
      return;
    }

    filteredAppointments.forEach((appt, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${appt.service}</td>
        <td>${appt.category || '-'}</td>
        <td>${appt.design || '-'}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td>${appt.status}</td>
        <td>${appt.status === 'Pending' ? `<button class="btn-cancel" data-index="${index}">Cancel</button>` : '-'}</td>
      `;
      appointmentsTableBody.appendChild(tr);
    });

    // Cancel button functionality
    document.querySelectorAll('.btn-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        if (confirm("Cancel this appointment?")) {
          appointments.splice(idx, 1);
          localStorage.setItem('appointments', JSON.stringify(appointments));
          renderAppointments(document.getElementById('filterStatus').value);
        }
      });
    });
  };

  renderAppointments();

  // Filter appointments by status
  document.getElementById('filterStatus').addEventListener('change', e => {
    renderAppointments(e.target.value);
  });

  // Modal Booking
  const modal = document.getElementById('appointmentModal');
  const newAppointmentBtn = document.getElementById('newAppointmentBtn');
  const closeModal = document.getElementById('closeModal');

  newAppointmentBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    populateServices();
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.getElementById('dashboardBookingForm').reset();
    document.querySelector('.category-design-group').style.display = 'flex';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
      document.getElementById('dashboardBookingForm').reset();
      document.querySelector('.category-design-group').style.display = 'flex';
    }
  });

  // Populate services dropdown
  function populateServices() {
    const serviceSelect = document.getElementById('dashboardService');
    serviceSelect.innerHTML = '<option value="">--Select Service--</option>';
    services.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      serviceSelect.appendChild(opt);
    });
  }

  // Populate categories & designs only for New Cloth
  const serviceSelect = document.getElementById('dashboardService');
  const categorySelect = document.getElementById('dashboardCategory');
  const designSelect = document.getElementById('dashboardDesign');
  const categoryDesignGroup = document.querySelector('.category-design-group');

  serviceSelect.addEventListener('change', () => {
    const selectedService = serviceSelect.value;
    if (selectedService === 'New Cloth') {
      categoryDesignGroup.style.display = 'flex';
      // Populate categories
      categorySelect.innerHTML = '<option value="">--Select Category--</option>';
      categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        categorySelect.appendChild(opt);
      });
      designSelect.innerHTML = '<option value="">--Select Design--</option>';
    } else {
      categoryDesignGroup.style.display = 'none';
    }
  });

  categorySelect.addEventListener('change', () => {
    const selectedCategoryId = parseInt(categorySelect.value);
    designSelect.innerHTML = '<option value="">--Select Design--</option>';
    designs.filter(d => d.categoryId === selectedCategoryId)
           .forEach(d => {
             const opt = document.createElement('option');
             opt.value = d.name;
             opt.textContent = d.name;
             designSelect.appendChild(opt);
           });
  });

  // Handle booking from modal
  document.getElementById('dashboardBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const appointment = {
      user: loggedInUser.name,
      email: loggedInUser.email,
      service: serviceSelect.value,
      category: categorySelect.options[categorySelect.selectedIndex]?.text || '',
      design: designSelect.value || '',
      date: document.getElementById('dashboardDate').value,
      time: document.getElementById('dashboardTime').value,
      status: 'Pending'
    };

    let allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    allAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    appointments.push(appointment); // update current view

    renderAppointments(document.getElementById('filterStatus').value);
    modal.style.display = 'none';
    document.getElementById('dashboardBookingForm').reset();
    categoryDesignGroup.style.display = 'flex';
  });
});
