document.addEventListener('DOMContentLoaded', () => {
  const categoriesContainer = document.getElementById('categoriesContainer');
  const categories = JSON.parse(localStorage.getItem('categories')) || [];

  if (categories.length === 0) {
    categoriesContainer.innerHTML = '<p style="text-align:center;">No categories available.</p>';
    return;
  }

  categoriesContainer.innerHTML = '';
  categories.forEach(cat => {
    const div = document.createElement('div');
    div.classList.add('category-card');
    div.innerHTML = `
      <img src="${cat.image || 'images/default.png'}" alt="${cat.name}" />
      <h3>${cat.name}</h3>
      <button onclick="viewDesigns(${cat.id})">View Designs</button>
    `;
    categoriesContainer.appendChild(div);
  });
});

// When user clicks "View Designs"
function viewDesigns(categoryId) {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const category = categories.find(c => c.id === categoryId);
  if (!category) return;
  localStorage.setItem('selectedCategory', JSON.stringify(category));
  window.location.href = 'designs.html';
}
