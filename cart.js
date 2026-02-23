function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

const cartItemsContainer = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
        <div class="quantity-controls">
          <button class="minus">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="plus">+</button>
        </div>
        <button class="remove">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);

    // Quantity controls
    div.querySelector('.plus').onclick = () => {
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
    div.querySelector('.minus').onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    };
    div.querySelector('.remove').onclick = () => {
      const index = cart.findIndex(i => i.id === item.id);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  });

  totalPriceEl.innerText = total.toFixed(2);
  updateCartCount();
  checkoutBtn.disabled = cart.length === 0;
}

renderCart();
// Checkout button redirect
checkoutBtn.onclick = () => {
  window.location.href = 'checkout.html';
};