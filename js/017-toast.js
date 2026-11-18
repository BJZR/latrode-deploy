function toast(m, ms = 2200) {
  const t = $("#ts");
  t.textContent = m;
  t.style.display = "block";
  clearTimeout(toast.t);
  if (ms) toast.t = setTimeout(() => (t.style.display = "none"), ms);
}
