$("#chips").onclick = (e) => {
  const b = e.target.closest("[data-c]");
  if (b) {
    cat = b.dataset.c;
    renderChips();
    renderGrid();
  }
};
