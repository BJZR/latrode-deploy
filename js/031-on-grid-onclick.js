$("#grid").onclick = (e) => {
  const b = e.target.closest("[data-id]");
  if (b) openProd(b.dataset.id);
};
