const parseLT = (t, sh) => {
  const L = [],
    S = {};
  let c = null;
  for (const raw of t.split(/\r?\n/)) {
    const l = raw.trim();
    if (!l || l[0] === "#") continue;
    const m = l.match(/^\[([\w-]+)\]$/);
    if (m) {
      if (m[1] === "tienda") c = S;
      else {
        c = { id: m[1] };
        L.push(c);
      }
      continue;
    }
    const i = l.indexOf("=");
    if (i > 0 && c) c[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  return {
    S,
    P: L.map((o) => ({
      id: o.id,
      n: o.nombre || "",
      c: o.categoria || "Camisetas",
      g: PL[(o.para || "").toLowerCase()] || "u",
      pr: +o.precio || 0,
      d: o.descripcion || "",
      s: (o.tallas || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      co: cols(o.colores),
      img: o.foto ? "img/" + o.foto.replace(/[^\w.\-]/g, "") : undefined,
      sh: sh || DB0,
    })),
  };
};
