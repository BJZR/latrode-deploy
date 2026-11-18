const api = async (p, o = {}, repo = DB0) => {
  if (!TOK) throw Object.assign(new Error("Sesión bloqueada"), { status: 0 });
  clearTimeout(lockT);
  lockT = setTimeout(() => {
    TOK = "";
  }, 9e5);
  const r = await fetch(
    "https://api.github.com/repos/" + OWNER + "/" + repo + p,
    {
      cache: "no-store",
      ...o,
      headers: {
        Authorization: "Bearer " + TOK,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    },
  );
  if (!r.ok)
    throw Object.assign(
      new Error(
        r.status === 401
          ? "Token inválido o vencido"
          : r.status === 403 || r.status === 404
            ? "Sin permiso: revisa token y repositorio"
            : "GitHub " + r.status,
      ),
      { status: r.status },
    );
  return r.json();
};
