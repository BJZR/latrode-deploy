// Estado real de GitHub: ajustes, repositorios y el siguiente id libre (p1, p2, …).
const remoteState = async () => {
  const t0 = await headText(DB0),
    set = setOf(parseLT(t0, DB0).S);
  let max = 0;
  for (const r of set.r)
    parseLT(r === DB0 ? t0 : await headText(r), r).P.forEach((p) => {
      if (/^p\d{1,4}$/.test(p.id)) max = Math.max(max, num(p.id));
    });
  return { set, next: "p" + (max + 1) };
};
