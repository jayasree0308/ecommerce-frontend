// Cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const productDetail = document.getElementById('productDetail');

fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(product => {
    productDetail.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-info">
        <h2>${product.title}</h2>
        <p>$${product.price}</p>
        <p>${product.description}</p>

        <!-- Size selection -->
        <label for="size">Size:</label>
        <select id="size">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <!-- Color selection -->
        <label for="color">Color:</label>
        <select id="color">
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
        </select>

        <!-- Quantity controls -->
        <div class="quantity-controls">
          <button id="minus">−</button>
          <span id="quantity">1</span>
          <button id="plus">+</button>
        </div>

        <button id="addToCartBtn">Add to Cart</button>
      </div>
    `;

    // Quantity logic
    let quantity = 1;
    document.getElementById('plus').onclick = () => {
      quantity++;
      document.getElementById('quantity').innerText = quantity;
    };
    document.getElementById('minus').onclick = () => {
      if (quantity > 1) quantity--;
      document.getElementById('quantity').innerText = quantity;
    };

    // Add to cart logic
    document.getElementById('addToCartBtn').onclick = () => {
      const selectedSize = document.getElementById('size').value;
      const selectedColor = document.getElementById('color').value;

      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if product with same variations exists
      const existing = cart.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
          size: selectedSize,
          color: selectedColor
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`Added ${quantity} x ${product.title} (${selectedSize}, ${selectedColor}) to cart!`);
    };
  })
  .catch(err => console.error(err));