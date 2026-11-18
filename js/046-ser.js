const ser = (repo, list, set) => {
  let o =
    "# Latrode: catálogo de " +
    repo +
    ". Lo edita el panel de administrador; también puedes editarlo a mano.\n";
  if (repo === DB0)
    o +=
      "# orden: arriba (el producto nuevo va arriba) o abajo. repos: lista de repositorios de datos.\n\n[tienda]\nwhatsapp = " +
      clean(set.wa) +
      "\nnequi = " +
      clean(set.nq) +
      "\norden = " +
      (set.o === "abajo" ? "abajo" : "arriba") +
      "\nrepos = " +
      set.r.join(", ") +
      "\nlimite_mb = " +
      set.l +
      "\n";
  for (const p of ordered(list, set.o))
    o +=
      "\n[" +
      p.id +
      "]\nnombre = " +
      clean(p.n) +
      "\ncategoria = " +
      clean(p.c) +
      "\npara = " +
      GL[p.g || "u"].toLowerCase() +
      "\nprecio = " +
      p.pr +
      "\ndescripcion = " +
      clean(p.d) +
      "\ntallas = " +
      p.s.map(clean).join(", ") +
      "\ncolores = " +
      p.co.map((x) => clean(x.n).replace(/[:,]/g, "") + ":" + x.h).join(", ") +
      (p.img ? "\nfoto = " + p.img.replace(/^img\//, "") : "") +
      "\n";
  return o;
};
