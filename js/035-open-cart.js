function openCart() {
  CART = CART.filter((i) => P.some((p) => p.id === i.pid));
  const sel = () => CART.filter((i) => i.sel),
    tot = () =>
      sel().reduce((a, i) => a + i.q * P.find((p) => p.id === i.pid).pr, 0);
  const f = ld("lt_cust", { n: "", t: "", a: "", o: "" });
  let okc = false;
  const draw = () => {
    const items = CART.map((i) => {
      const p = P.find((x) => x.id === i.pid),
        h = (p.co.find((c) => c.n === i.c) || {}).h;
      return `<div class="ci"><button class="cb" data-k="${i.id}" role="checkbox" aria-checked="${i.sel}" aria-label="Incluir en el pedido">${i.sel ? IC('<path d="M5 12.5l4.5 4.5L19 7"/>', 16) : ""}</button><img alt="" src="${art(p, h)}"><div class="d"><b>${esc(p.n)}</b><br><small>${esc([i.c, i.s && "Talla " + i.s].filter(Boolean).join(" · "))}</small><br>${COP(p.pr * i.q)}</div>
<div class="qty"><button data-m="${i.id}" aria-label="Menos">−</button><b>${i.q}</b><button data-pl="${i.id}" aria-label="Más">+</button></div><button class="x" data-rm="${i.id}" aria-label="Quitar">${IC('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>', 18)}</button></div>`;
    }).join("");
    openSh(`<div class="row"><h2>Tu carrito</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div>
${
  CART.length
    ? `<p class="mu" style="margin-top:6px">Marca los productos que quieres comprar ahora.</p>${items}
<div class="row" style="margin-top:16px"><span>Total (${sel().length} seleccionados)</span><span class="tot">${COP(tot())}</span></div>
<span class="lb">Datos de entrega</span>
<input id="cn1" placeholder="Nombre completo" autocomplete="name" value="${esc(f.n)}"><input id="cn2" type="tel" placeholder="Celular" autocomplete="tel" value="${esc(f.t)}">
<input id="cn3" placeholder="Dirección y ciudad" autocomplete="street-address" value="${esc(f.a)}"><textarea id="cn4" rows="2" placeholder="Notas (opcional)">${esc(f.o)}</textarea>
<div class="note"><b>Pago por Nequi</b><br>Envía el valor total al <b>${esc(CFG.nq)}</b> y manda el comprobante por WhatsApp. <button class="sm" id="cp">Copiar número</button></div>
<div class="row" style="justify-content:flex-start;margin-top:12px"><button class="cb" id="cc" role="checkbox" aria-checked="${okc}" aria-label="Acepto el tratamiento de mis datos">${okc ? IC('<path d="M5 12.5l4.5 4.5L19 7"/>', 16) : ""}</button><span class="mu">Acepto que Latrode use mis datos solo para gestionar este pedido. <button class="sm" id="pv">Ver política</button></span></div><button class="btn g" id="go" ${sel().length ? "" : "disabled"}>Enviar pedido por WhatsApp</button><p class="mu er" id="er" style="margin-top:8px"></p>`
    : `<p class="empty">Tu carrito está vacío.</p>`
}`);
    $("#cl").onclick = closeSh;
    const keep = () => {
      if (!$("#cn1")) return;
      Object.assign(f, {
        n: $("#cn1").value,
        t: $("#cn2").value,
        a: $("#cn3").value,
        o: $("#cn4").value,
      });
      if (okc) sv("lt_cust", f);
    };
    $("#sh").onchange = (e) => {
      const k = e.target.dataset.k;
      if (k) {
        CART.find((i) => i.id === k).sel = e.target.checked;
        sv(K.k, CART);
        keep();
        draw();
      }
    };
    $("#sh").onclick = (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      const g = (id) => CART.find((i) => i.id === id);
      keep();
      if (t.id === "cc") okc = !okc;
      else if (t.id === "pv") {
        policy(openCart);
        return;
      } else if (t.dataset.k) {
        const i = g(t.dataset.k);
        i.sel = !i.sel;
      } else if (t.dataset.m) {
        const i = g(t.dataset.m);
        i.q = Math.max(1, i.q - 1);
      } else if (t.dataset.pl) {
        const i = g(t.dataset.pl);
        i.q = Math.min(20, i.q + 1);
      } else if (t.dataset.rm) {
        CART = CART.filter((i) => i.id !== t.dataset.rm);
      } else if (t.id === "cp") {
        (navigator.clipboard
          ? navigator.clipboard.writeText(CFG.nq)
          : Promise.reject()
        ).then(
          () => toast("Número copiado"),
          () => toast("Número: " + CFG.nq),
        );
        return;
      } else if (t.id === "go") {
        send();
        return;
      } else return;
      sv(K.k, CART);
      badge();
      draw();
    };
    $("#cn1") &&
      ["cn1", "cn2", "cn3", "cn4"].forEach((i) => ($("#" + i).oninput = keep));
  };
  const send = () => {
    const n = $("#cn1").value.trim(),
      t = $("#cn2").value.trim(),
      a = $("#cn3").value.trim();
    if (!n || !t || !a) {
      $("#er").textContent = "Completa nombre, celular y dirección.";
      return;
    }
    if (!okc) {
      $("#er").textContent =
        "Acepta el tratamiento de datos para enviar el pedido.";
      return;
    }
    const L = sel().map((i) => {
      const p = P.find((x) => x.id === i.pid);
      return `• ${i.q} x ${p.n}${i.c ? " | " + i.c : ""}${i.s ? " | Talla " + i.s : ""} — ${COP(p.pr * i.q)}`;
    });
    const msg = `Hola Latrode, quiero hacer este pedido:\n\n${L.join("\n")}\n\nTotal: ${COP(tot())}\nPago: Nequi\n\nNombre: ${n}\nCelular: ${t}\nDirección: ${a}${$("#cn4").value.trim() ? "\nNotas: " + $("#cn4").value.trim() : ""}`;
    window.open(
      `https://wa.me/${CFG.wa.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    CART = CART.filter((i) => !i.sel);
    sv(K.k, CART);
    badge();
    draw();
    toast("Pedido enviado. Paga por Nequi y manda el comprobante");
  };
  draw();
}
