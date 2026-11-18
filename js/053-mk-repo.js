const mkRepo = async (name) => {
  const H = {
      Authorization: "Bearer " + TOK,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    U = "https://api.github.com/repos/" + OWNER + "/" + name;
  if (!(await fetch(U, { headers: H, cache: "no-store" })).ok) {
    const c = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: H,
      body: JSON.stringify({
        name,
        private: false,
        auto_init: true,
        description: "Latrode: base de datos",
      }),
    });
    if (!c.ok)
      throw new Error(
        "Crea a mano el repositorio " +
          name +
          " (público, con README), actívale Pages (rama main, raíz), agrégalo a tu token y reintenta",
      );
  }
  await fetch(U + "/pages", {
    method: "POST",
    headers: H,
    body: JSON.stringify({ source: { branch: BR, path: "/" } }),
  }).catch(() => {});
};
