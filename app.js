// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

// Fetch products
const productGrid = document.querySelector('.product-grid');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        <button onclick="window.location.href='product.html?id=${product.id}'">View</button>
      `;
      productGrid.appendChild(card);
    });
  })
  .catch(err => console.error(err));

// Add to Cart function
function addToCart(id, title, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Item added to cart!');
}
document.addEventListener("DOMContentLoaded", function() {
  const lazyBackgrounds = document.querySelectorAll(".lazy-bg");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
        observer.unobserve(entry.target);
      }
    });
  });

  lazyBackgrounds.forEach(bg => observer.observe(bg));
});