document.getElementById("user-icon").addEventListener("click", () => {
    window.location.href = "/login";
});
const cartIcon = document.querySelector('.bx-cart');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');

  cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    document.body.classList.add('cart-open');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    document.body.classList.remove('cart-open');
  });

  // Close cart if overlay is clicked
  document.body.addEventListener('click', (e) => {
    if (document.body.classList.contains('cart-open') &&
        !cartSidebar.contains(e.target) &&
        !cartIcon.contains(e.target)) {
      cartSidebar.classList.remove('active');
      document.body.classList.remove('cart-open');
    }
  });