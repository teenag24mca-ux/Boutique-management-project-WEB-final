document.addEventListener('DOMContentLoaded', () => {
  const servicesContainer = document.getElementById('servicesContainer');

  const services = [
    {
      id: 1,
      name: 'Cloth Stitching',
      description: 'Choose a cloth, select a category and design, and we will stitch it perfectly.',
      image: 'images/newcloth.jpeg',
      link: 'categories.html'
    },
    {
      id: 2,
      name: 'Alterations',
      description: 'Tailoring adjustments for existing garments to fit perfectly.',
      image: 'images/alteration1.jpeg',
      link: 'booking.html'
    },
    {
      id: 3,
      name: 'Saree Falls',
      description: 'Professional saree fall stitching for a flawless drape.',
      image: 'images/sareefall1.jpeg',
      link: 'booking.html'
    },
    {
      id: 4,
      name: 'Consultation',
      description: 'Get expert advice on your tailoring requirements and fabric choices.',
      image: 'images/consultation.jpeg',
      link: 'booking.html'
    }
  ];

  servicesContainer.innerHTML = '';

  services.forEach(service => {
    const card = document.createElement('div');
    card.classList.add('service-card');
    card.innerHTML = `
      <img src="${service.image}" alt="${service.name}">
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <a href="${service.link}" class="btn-primary">Book Now</a>
    `;
    servicesContainer.appendChild(card);
  });
});
