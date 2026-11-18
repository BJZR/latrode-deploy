function badge() {
  $("#cn").textContent = CART.reduce((a, i) => a + i.q, 0);
}
