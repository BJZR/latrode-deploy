// Cambios que se aplican sobre el contenido real del repositorio (nunca sobre una copia vieja).
const setFor = (repo, S) =>
  repo === DB0 ? setOf(S) : { ...setOf({}), o: CFG.o };
const opUpsert = (repo, o) => (cur) => {
  const d = parseLT(cur, repo);
  return ser(
    repo,
    [...d.P.filter((p) => p.id !== o.id), { ...o, sh: repo }],
    setFor(repo, d.S),
  );
};
const opRemove = (repo, id) => (cur) => {
  const d = parseLT(cur, repo);
  return ser(
    repo,
    d.P.filter((p) => p.id !== id),
    setFor(repo, d.S),
  );
};
const opSettings = (wa, nq) => (cur) => {
  const d = parseLT(cur, DB0);
  return ser(DB0, d.P, { ...setOf(d.S), wa, nq });
};
const opAddRepo = (name) => (cur) => {
  const d = parseLT(cur, DB0),
    s = setOf(d.S);
  return ser(DB0, d.P, { ...s, r: s.r.includes(name) ? s.r : [...s.r, name] });
};
