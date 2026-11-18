// Un commit atómico: lee el estado actual del repo, aplica el cambio sobre ESE estado,
// sube fotos nuevas y borra las que ya no usa ningún producto. Devuelve el texto guardado.
async function commit(repo, msg, build, up, del) {
  const R = (p, o) => api(p, o, repo),
    head = (await R("/git/ref/heads/" + BR)).object.sha,
    base = (await R("/git/commits/" + head)).tree.sha;
  const ex = new Map(
    (await R("/git/trees/" + base + "?recursive=1")).tree
      .filter((x) => x.type === "blob")
      .map((x) => [x.path, x.sha]),
  );
  const h = ex.get("productos.lt"),
    cur = h
      ? dec.decode(u8((await R("/git/blobs/" + h)).content.replace(/\s/g, "")))
      : "",
    text = build(cur),
    keep = new Set(
      parseLT(text, repo)
        .P.map((p) => p.img)
        .filter(Boolean),
    ),
    rm = new Set(del);
  for (const k of ex.keys())
    if (k.startsWith("img/") && k !== "img/.gitkeep" && !keep.has(k)) rm.add(k);
  const files = [{ path: "productos.lt", c: b64(enc.encode(text)) }, ...up],
    tree = [];
  for (const f of files) {
    const b = await R("/git/blobs", {
      method: "POST",
      body: JSON.stringify({ content: f.c, encoding: "base64" }),
    });
    tree.push({ path: f.path, mode: "100644", type: "blob", sha: b.sha });
  }
  for (const p of rm)
    if (ex.has(p) && !files.some((f) => f.path === p))
      tree.push({ path: p, mode: "100644", type: "blob", sha: null });
  const t = await R("/git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: base, tree }),
  });
  const n = await R("/git/commits", {
    method: "POST",
    body: JSON.stringify({ message: msg, tree: t.sha, parents: [head] }),
  });
  await R("/git/refs/heads/" + BR, {
    method: "PATCH",
    body: JSON.stringify({ sha: n.sha }),
  });
  return text;
}
