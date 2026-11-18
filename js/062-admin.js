function admin(e) {
  const ed = e
    ? P.find((p) => p.id === e)
    : { n: "", c: CATS[0], pr: "", d: "", s: SH[CATS[0]], co: [] };
  const isC = !CATS.includes(ed.c),
    errNow = lastErr;
  lastErr = "";
  openSh(`<div class="row"><h2>Administrar</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div>
${errNow ? `<p class="er" style="margin:8px 0">${esc(errNow)}</p>` : ""}
<span class="lb">${e ? "Editar producto " + esc(e) : "Nuevo producto"}</span>
<input id="an" maxlength="80" placeholder="Nombre" value="${esc(ed.n)}">
<input type="hidden" id="ac" value="${isC ? "Personalizado" : esc(ed.c)}"><div class="dd"><button type="button" class="dh" id="acb" aria-expanded="false"><span id="acv">${isC ? "Personalizado" : esc(ed.c)}</span>${IC('<path d="M6 9l6 6 6-6"/>', 16)}</button><div class="dl" id="acl" hidden>${[...CATS, "Personalizado"].map((c) => `<button type="button" data-o="${esc(c)}">${esc(c)}</button>`).join("")}</div></div><input id="acx" maxlength="30" placeholder="¿Qué tipo de producto es? (ej. Guantes)" value="${isC ? esc(ed.c) : ""}" ${isC ? "" : "hidden"}>
<span class="lb" style="margin-top:4px">Para</span><input type="hidden" id="ag" value="${ed.g || "u"}"><div class="dd"><button type="button" class="dh" id="agb" aria-expanded="false"><span id="agv">${GL[ed.g || "u"]}</span>${IC('<path d="M6 9l6 6 6-6"/>', 16)}</button><div class="dl nf" id="agl" hidden>${["h", "m", "u"].map((c) => `<button type="button" data-go="${c}">${GL[c]}</button>`).join("")}</div></div>
<input id="ap" type="number" min="0" inputmode="numeric" placeholder="Precio en COP" value="${ed.pr}">
<textarea id="ad2" rows="2" maxlength="300" placeholder="Descripción">${esc(ed.d || "")}</textarea>
<input id="as" placeholder="Tallas separadas por coma (S,M,L)" value="${esc(ed.s.join(","))}">
<input id="aco" placeholder="Colores: Negro:#111111, Azul:#2b4cff" value="${esc(ed.co.map((c) => c.n + ":" + c.h).join(", "))}">
<label class="mu">Foto (opcional)</label><input id="af" type="file" accept="image/*">
<div class="row"><button class="btn" id="sa" style="margin-top:4px">${e ? "Guardar y publicar" : "Agregar y publicar"}</button>${e ? `<button class="btn s" id="nw" style="margin-top:4px">Cancelar</button>` : ""}</div>
<span class="lb">Productos (${P.length})</span>
${ordered()
  .map(
    (p) =>
      `<div class="al"><img alt="" src="${art(p)}"><span><b>${esc(p.n)}</b><br><small class="mu">${esc(p.id)} · ${esc(p.c)} · ${GL[p.g || "u"]} · ${COP(p.pr)}</small></span><button class="sm" data-e="${p.id}">Editar</button><button class="sm" data-d="${p.id}">Borrar</button></div>`,
  )
  .join("")}
<span class="lb">Ajustes de la tienda</span>
<input id="cw" inputmode="numeric" placeholder="WhatsApp con indicativo (573001234567)" value="${esc(CFG.wa)}">
<input id="cq" inputmode="numeric" placeholder="Número Nequi" value="${esc(CFG.nq)}">
<button class="btn s" id="cs">Guardar ajustes y publicar</button>
<button class="btn s" id="dg">Diagnóstico</button>
<div class="row"><button class="btn s" id="lo">Bloquear</button><button class="btn s" id="fg">Olvidar token</button></div>
<p class="mu" style="margin-top:10px">Cada cambio se guarda en un solo commit en ${esc(CFG.r.join(", "))} y los clientes lo ven en 1–2 minutos. Las fotos que ya no se usan se borran solas.</p>`);
  $("#cl").onclick = closeSh;
  const rd = (f) =>
    new Promise((r) => {
      const x = new FileReader();
      x.onload = () => {
        const i = new Image();
        i.onload = () => {
          const m = 720,
            k = Math.min(1, m / Math.max(i.width, i.height)),
            c = document.createElement("canvas");
          c.width = i.width * k;
          c.height = i.height * k;
          c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
          const w = c.toDataURL("image/webp", 0.78);
          r(
            w.startsWith("data:image/webp")
              ? w
              : c.toDataURL("image/jpeg", 0.8),
          );
        };
        i.src = x.result;
      };
      x.readAsDataURL(f);
    });
  $("#sh").onclick = async (ev) => {
    const t = ev.target.closest("button");
    if (!t) return;
    if (t.id === "agb") {
      const l = $("#agl");
      l.hidden = !l.hidden;
      t.setAttribute("aria-expanded", String(!l.hidden));
      return;
    }
    if (t.dataset.go) {
      $("#ag").value = t.dataset.go;
      $("#agv").textContent = GL[t.dataset.go];
      $("#agl").hidden = true;
      $("#agb").setAttribute("aria-expanded", "false");
      return;
    }
    if (t.id === "acb") {
      const l = $("#acl");
      l.hidden = !l.hidden;
      t.setAttribute("aria-expanded", String(!l.hidden));
      return;
    }
    if (t.dataset.o !== undefined) {
      const v = t.dataset.o;
      $("#ac").value = v;
      $("#acv").textContent = v;
      $("#acl").hidden = true;
      $("#acb").setAttribute("aria-expanded", "false");
      const x = $("#acx");
      x.hidden = v !== "Personalizado";
      if (v === "Personalizado") x.focus();
      else $("#as").value = SH[v].join(",");
      return;
    }
    if (t.dataset.e) return admin(t.dataset.e);
    if (t.id === "nw") return admin();
    if (t.id === "dg")
      return run(async () => {
        t.disabled = true;
        t.textContent = "Revisando…";
        const o = await diagnose();
        openSh(
          '<div class="row"><h2>Diagnóstico</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div>' +
            o
              .map(
                (l) =>
                  '<p class="' +
                  (l[0] === "✗" ? "er" : "mu") +
                  '" style="margin-top:8px">' +
                  esc(l) +
                  "</p>",
              )
              .join("") +
            '<button class="btn" id="bk">Volver</button>',
        );
        $("#cl").onclick = closeSh;
        $("#sh").onclick = (ev) => {
          if (ev.target.closest("#bk")) admin();
        };
      });
    if (t.id === "lo") {
      TOK = "";
      closeSh();
      toast("Panel bloqueado");
      return;
    }
    if (t.id === "fg") {
      TOK = "";
      GH = {};
      sv("lt_gh", GH);
      closeSh();
      toast("Token olvidado en este dispositivo");
      return;
    }
    if (t.dataset.d) {
      if (t.dataset.cf !== "1") {
        t.dataset.cf = "1";
        t.textContent = "¿Seguro?";
        t.style.color = "var(--er)";
        return;
      }
      return run(async () => {
        const old = P.find((p) => p.id === t.dataset.d),
          sn = [P.slice(), { ...CFG }];
        t.disabled = true;
        P = P.filter((p) => p !== old);
        refresh();
        if (
          !(await publish(
            old.sh,
            "borrar " + old.id,
            opRemove(old.sh, old.id),
            [],
            old.img ? [old.img] : [],
          ))
        ) {
          [P, CFG] = sn;
          refresh();
        }
        admin();
      });
    }
    if (t.id === "cs") {
      const wa = $("#cw").value.replace(/\D/g, ""),
        nq = $("#cq").value.replace(/\D/g, "");
      if (wa.length < 10 || nq.length < 10) {
        toast("Revisa los números (mínimo 10 dígitos)");
        return;
      }
      return run(async () => {
        const sn = [P.slice(), { ...CFG }];
        t.disabled = true;
        CFG = { ...CFG, wa, nq };
        if (!(await publish(DB0, "ajustes", opSettings(wa, nq)))) {
          [P, CFG] = sn;
        }
        admin();
      });
    }
    if (t.id === "sa") {
      const n = $("#an").value.trim().slice(0, 80),
        pr = Math.round(+$("#ap").value);
      if (!n || !(pr > 0)) {
        toast("Escribe nombre y precio");
        return;
      }
      const cv = (
        $("#ac").value === "Personalizado"
          ? $("#acx").value.trim()
          : $("#ac").value
      ).slice(0, 30);
      if (!cv) {
        toast("Escribe el tipo de producto");
        return;
      }
      const s = $("#as")
        .value.split(",")
        .map((x) => x.trim().slice(0, 12))
        .filter(Boolean)
        .slice(0, 12);
      return run(async () => {
        let st = null;
        if (!e) {
          try {
            st = await remoteState();
          } catch (x) {
            lastErr = x.message || "Error";
            admin();
            return;
          }
        }
        const sn = [P.slice(), { ...CFG }],
          id = e || st.next,
          o = {
            id,
            n,
            c: cv,
            pr: Math.min(pr, 99999999),
            d: $("#ad2").value.trim().slice(0, 300),
            s: s.length ? s : SH[cv] || ["Única"],
            g: $("#ag").value,
            co: cols($("#aco").value).slice(0, 12),
            img: ed.img,
            pv: ed.pv,
            sh: ed.sh,
          },
          up = [],
          del = [];
        t.disabled = true;
        const f = $("#af").files[0];
        if (f) {
          try {
            toast("Preparando foto…", 0);
            const d = await rd(f),
              nm =
                id +
                "-" +
                Date.now().toString(36) +
                (d.startsWith("data:image/webp") ? ".webp" : ".jpg");
            up.push({ path: "img/" + nm, c: d.split(",")[1] });
            if (ed.img && ed.img.startsWith("img/")) del.push(ed.img);
            o.img = "img/" + nm;
            o.pv = d;
          } catch (x) {
            toast("No se pudo leer la foto", 5000);
            t.disabled = false;
            return;
          }
        }
        try {
          if (!e)
            o.sh = await shardFor(
              up.reduce((a, x) => a + x.c.length * 0.75, 0) + 4096,
              st.set,
            );
          if (e) P = P.map((p) => (p.id === e ? o : p));
          else P.push(o);
          P = ordered();
          refresh();
          if (
            !(await publish(
              o.sh,
              (e ? "editar " : "agregar ") + id + " " + n,
              opUpsert(o.sh, o),
              up,
              del,
            ))
          ) {
            [P, CFG] = sn;
            refresh();
          }
        } catch (x) {
          lastErr = x.message || "Error";
          toast(lastErr, 9000);
          [P, CFG] = sn;
          refresh();
        }
        admin();
      });
    }
  };
}
