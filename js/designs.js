document.addEventListener('DOMContentLoaded', () => {
  const category = JSON.parse(localStorage.getItem('selectedCategory'));
  const designsContainer = document.getElementById('designsContainer');
  const categoryTitle = document.getElementById('categoryTitle');

  if (!category) {
    designsContainer.innerHTML = '<p style="text-align:center;">No category selected.</p>';
    return;
  }

  categoryTitle.innerText = category.name;

  let allDesigns = JSON.parse(localStorage.getItem('designs')) || [];

  // 🔍 Debug: See what is stored in localStorage
  console.log("All designs in storage:", allDesigns);
  console.log("Selected category:", category);

  // Fix filter: make sure categoryId is compared as number
  const designs = allDesigns.filter(d => Number(d.categoryId) === Number(category.id));

  // 🔍 Debug: See what matched
  console.log("Filtered designs for this category:", designs);

  designsContainer.innerHTML = '';
  if (designs.length === 0) {
    designsContainer.innerHTML = '<p style="text-align:center;">No designs available for this category.</p>';
    return;
  }

  designs.forEach(design => {
    const card = document.createElement('div');
    card.classList.add('design-card');
    card.innerHTML = `
      <img src="${design.image || 'images/default.png'}" alt="${design.name}">
      <h3>${design.name}</h3>
      <button onclick="bookDesign('${design.name}')">Book This Design</button>
    `;
    designsContainer.appendChild(card);
  });
});

function bookDesign(designName){
  localStorage.setItem('selectedDesign', designName);
  window.location.href = 'booking.html';
}
