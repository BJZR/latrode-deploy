$("#gb").onclick = () => {
  gen = GO[(GO.indexOf(gen) + 1) % 3];
  sv("lt_gen", gen);
  gR();
  renderGrid();
  toast("Para: " + GL[gen]);
};
