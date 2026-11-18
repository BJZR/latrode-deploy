function openProd(id) {
  const p = P.find((x) => x.id === id);
  if (!p) return;
  let sz = null,
    co = p.co[0] || null,
    q = 1;
  const draw = () => {
    openSh(`<div class="row"><h2>${esc(p.n)}</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div>
<img class="pimg" alt="${esc(p.n)}" src="${art(p, co && co.h)}"><div class="row"><b style="font-size:22px">${COP(p.pr)}</b><span class="mu">${esc(p.c)} · ${GL[p.g || "u"]}</span></div>
<p class="mu" style="margin-top:6px">${esc(p.d || "")}</p>
${p.co.length ? `<span class="lb">Color: ${esc(co ? co.n : "")}</span><div class="opts">${p.co.map((c, i) => `<button class="sw" style="background:${esc(c.h)}" aria-label="${esc(c.n)}" aria-pressed="${co === c}" data-co="${i}"></button>`).join("")}</div>` : ""}
<span class="lb">Talla</span><div class="opts">${p.s.map((s) => `<button class="op" aria-pressed="${sz === s}" data-s="${esc(s)}">${esc(s)}</button>`).join("")}</div>
<span class="lb">Cantidad</span><div class="qty"><button data-q="-1" aria-label="Menos">−</button><b>${q}</b><button data-q="1" aria-label="Más">+</button></div>
<button class="btn" id="add" ${sz || !p.s.length ? "" : "disabled"}>${sz ? "Agregar al carrito" : "Elige una talla"}</button>`);
    $("#cl").onclick = closeSh;
    $("#sh").onclick = (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.dataset.co !== undefined) {
        co = p.co[+t.dataset.co];
        draw();
      } else if (t.dataset.s !== undefined) {
        sz = t.dataset.s;
        draw();
      } else if (t.dataset.q) {
        q = Math.max(1, Math.min(20, q + +t.dataset.q));
        draw();
      } else if (t.id === "add" && (sz || !p.s.length)) {
        const k = CART.find(
          (i) => i.pid === p.id && i.s === sz && i.c === (co && co.n),
        );
        if (k) k.q += q;
        else
          CART.push({
            id: Date.now() + "",
            pid: p.id,
            s: sz,
            c: co && co.n,
            q,
            sel: true,
          });
        sv(K.k, CART);
        badge();
        closeSh();
        toast("Agregado al carrito");
      }
    };
  };
  draw();
}
