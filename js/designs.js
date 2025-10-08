document.addEventListener('DOMContentLoaded', () => {
  const category = JSON.parse(localStorage.getItem('selectedCategory'));
  const designsContainer = document.getElementById('designsContainer');
  const categoryTitle = document.getElementById('categoryTitle');

  if (!category) {
    designsContainer.innerHTML = '<p style="text-align:center;">No category selected.</p>';
    return;
  }

  categoryTitle.innerText = category.name;

  const allDesigns = JSON.parse(localStorage.getItem('designs')) || [];

  // ✅ Filter designs by category name
  const designs = allDesigns.filter(d => d.category === category.name);

  designsContainer.innerHTML = '';

  if (designs.length === 0) {
    designsContainer.innerHTML = '<p style="text-align:center;">No designs available for this category.</p>';
    return;
  }

  // ✅ Show designs
  designs.forEach(design => {
    const card = document.createElement('div');
    card.classList.add('design-card');
    card.innerHTML = `
      <img src="${design.image || 'images/default.png'}" alt="${design.name}">
      <h3>${design.name}</h3>
      <button onclick="bookDesign('${design.name}', '${design.category}')">Book This Design</button>
    `;
    designsContainer.appendChild(card);
  });
});

// ✅ Book Design Function
function bookDesign(designName, categoryName) {
  localStorage.setItem('selectedDesign', JSON.stringify({ name: designName, category: categoryName }));
  window.location.href = 'booking.html';
}
