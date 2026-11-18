function art(p, h) {
  h = h || (p.co[0] && p.co[0].h) || "#888";
  if (p.pv) return p.pv;
  if (p.img) return dbBase(p.sh) + p.img;
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#8a90a01f"/><path d="${PATH[p.c] || PATH.Accesorios}" fill="${h}" stroke="#00000033" stroke-width="1" stroke-linejoin="round"/></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(s);
}
