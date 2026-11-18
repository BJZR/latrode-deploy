function setTheme(t) {
  if (t === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.dataset.theme = t;
  $("#th").innerHTML = TI[t] + "<span>" + TN[t] + "</span>";
  $("#th").title = "Tema: " + TN[t];
}
