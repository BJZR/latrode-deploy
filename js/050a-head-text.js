// Lee productos.lt tal como está ahora mismo en el repositorio (no la copia local).
const headText = async (repo) => {
  const h = (await api("/git/ref/heads/" + BR, {}, repo)).object.sha,
    b = (await api("/git/commits/" + h, {}, repo)).tree.sha,
    e = (await api("/git/trees/" + b, {}, repo)).tree.find(
      (x) => x.path === "productos.lt",
    );
  return e
    ? dec.decode(
        u8(
          (await api("/git/blobs/" + e.sha, {}, repo)).content.replace(
            /\s/g,
            "",
          ),
        ),
      )
    : "";
};
