// Initialize an empty cart or load it from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count and total price displayed in the header
function updateCartDisplay() {
  const cartCountElement = document.querySelector('.cart-count');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  cartCountElement.textContent = totalItems;
  document.querySelector('.cart-total-price').textContent = `Total: $${totalPrice}`;
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.card');
    const productName = productCard.querySelector('.card-title').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));

    // Check if the product already exists in the cart
    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if it exists
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartDisplay();
    saveCartToLocalStorage();
  });
});

// Save the cart to localStorage for persistence
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Open the cart modal
document.querySelector('.cart-btn').addEventListener('click', () => {
  const modal = document.querySelector('#cart-modal');
  const cartList = modal.querySelector('.cart-items-list');

  // Clear the modal's existing items
  cartList.innerHTML = '';

  // Populate the modal with items from the cart
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.quantity})`;

    // Add a remove button for each item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-item');
    removeButton.addEventListener('click', () => removeItemFromCart(index));

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });

  // Show the total price in the modal
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  modal.querySelector('.cart-total-price').textContent = `Total: $${totalPrice}`;

  // Display the modal
  modal.style.display = 'block';
});

// Close the cart modal
document.querySelector('.close-modal').addEventListener('click', () => {
  const modal = document.querySelector('#cart-modal');
  modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  const modal = document.querySelector('#cart-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Remove an item from the cart
function removeItemFromCart(index) {
  cart.splice(index, 1); // Remove the item at the given index
  updateCartDisplay();
  saveCartToLocalStorage();
  updateCartModal(); // Reflect the changes in the modal
}

// Update the cart modal
function updateCartModal() {
  const modal = document.querySelector('#cart-modal');
  const cartList = modal.querySelector('.cart-items-list');

  // Clear the modal's existing items
  cartList.innerHTML = '';

  // Populate the modal with updated items
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.quantity})`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-item');
    removeButton.addEventListener('click', () => removeItemFromCart(index));

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });

  // Show the updated total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  modal.querySelector('.cart-total-price').textContent = `Total: $${totalPrice}`;
}

// Clear the entire cart
document.querySelector('.clear-cart').addEventListener('click', () => {
  cart = [];
  updateCartDisplay();
  saveCartToLocalStorage();
  updateCartModal();
});

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
});