// Cart Array to store added products
let cart = [];

// Add Event Listener to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productDescription = this.previousElementSibling.textContent;
        cart.push(productDescription);
        alert(`${productDescription} added to cart!`);
        console.log(cart);
    });
});

// Handle Cart Button Click (this can show cart summary or open a modal)
document.getElementById('cart-btn').addEventListener('click', function() {
    if (cart.length > 0) {
        alert('You have ' + cart.length + ' items in your cart!');
    } else {
        alert('Your cart is empty!');
    }
});