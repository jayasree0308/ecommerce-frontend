// scripts/checkout.js

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

// Render checkout items
const checkoutItems = document.getElementById('checkoutItems');
const totalItemsEl = document.getElementById('totalItems');
const totalPriceEl = document.getElementById('totalPrice');

function renderCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  checkoutItems.innerHTML = '';
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="80">
      <div>
        <h4>${item.title}</h4>
        <p>Size: ${item.size} | Color: ${item.color}</p>
        <p>Price: $${item.price} × ${item.quantity}</p>
      </div>
    `;
    checkoutItems.appendChild(div);
  });

  totalItemsEl.innerText = totalItems;
  totalPriceEl.innerText = totalPrice.toFixed(2);
}

renderCheckoutItems();

// Handle form submission
const checkoutForm = document.getElementById('checkoutForm');
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate form fields (simplified)
  const fullname = document.getElementById('fullname').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const zip = document.getElementById('zip').value.trim();
  const email = document.getElementById('email').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const expiry = document.getElementById('expiry').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  if (!fullname || !address || !city || !state || !zip || !email || !cardNumber || !expiry || !cvv) {
    alert('Please fill in all fields!');
    return;
  }

  // Simulate order success
  alert('Order placed successfully! Thank you for shopping with us.');

  // Clear cart
  localStorage.removeItem('cart');
  updateCartCount();
  renderCheckoutItems();

  // Reset form
  checkoutForm.reset();

  // Redirect to homepage after 2 seconds
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
});