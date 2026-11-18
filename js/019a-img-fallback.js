// Si una foto aún no está publicada en Pages, se pide directo al repositorio.
document.addEventListener(
  "error",
  (e) => {
    const i = e.target;
    if (!i || i.tagName !== "IMG" || i.dataset.fb) return;
    i.dataset.fb = "1";
    const m = i.src.match(
      /^https:\/\/[^/]+\/(latrode-db[\w-]*)\/(img\/[\w.\-]+)$/i,
    );
    if (m)
      i.src =
        "https://raw.githubusercontent.com/" +
        OWNER +
        "/" +
        m[1] +
        "/" +
        BR +
        "/" +
        m[2];
  },
  true,
);
