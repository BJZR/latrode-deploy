$("#q").oninput = (e) => {
  term = e.target.value.trim().toLowerCase();
  renderGrid();
};
