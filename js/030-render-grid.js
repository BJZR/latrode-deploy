function renderGrid() {
  const l = P.filter(
    (p) =>
      (cat === "Todo" || p.c === cat) &&
      ((gen !== "h" && gen !== "m") ||
        (p.g || "u") === gen ||
        (p.g || "u") === "u") &&
      (p.n + " " + p.c).toLowerCase().includes(term),
  );
  $("#grid").innerHTML = l.length
    ? l
        .map(
          (p) =>
            `<button class="card" data-id="${p.id}"><img loading="lazy" alt="${esc(p.n)}" src="${art(p)}"><div class="i"><h3>${esc(p.n)}</h3><div class="pr">${COP(p.pr)}</div><div class="dots">${p.co
              .slice(0, 5)
              .map((c) => `<i style="background:${esc(c.h)}"></i>`)
              .join("")}</div></div></button>`,
        )
        .join("")
    : `<p class="empty">${LERR ? "No se pudo cargar el catálogo (" + esc(LERR) + ")." : "No hay productos" + (P.length ? " con ese filtro" : " todavía") + "."}</p>`;
}
