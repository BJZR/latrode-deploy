$("#th").onclick = () => {
  tm = TH[(TH.indexOf(tm) + 1) % 3];
  sv(K.t, tm);
  setTheme(tm);
  toast("Tema: " + $("#th").title.slice(6));
};
