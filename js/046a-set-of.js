// Ajustes de la tienda a partir de la sección [tienda] de latrode-db.
const setOf = (S) => {
  const r = (S.repos || "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => RN.test(x));
  if (!r.includes(DB0)) r.unshift(DB0);
  return {
    wa: S.whatsapp || CFG.wa,
    nq: S.nequi || CFG.nq,
    o: S.orden === "abajo" ? "abajo" : "arriba",
    r,
    l: Math.max(1, +S.limite_mb || 700),
  };
};
