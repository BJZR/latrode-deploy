// Revisa de punta a punta que los datos se guardan y se leen bien.
async function diagnose() {
  const out = [],
    ok = (m, v) => out.push((v ? "✓ " : "✗ ") + m);
  try {
    const st = await remoteState();
    ok("Token y acceso a " + st.set.r.join(", "), true);
    for (const r of st.set.r) {
      ok(
        r +
          ": " +
          parseLT(await headText(r), r).P.length +
          " productos en el repositorio",
        true,
      );
      for (const raw of [true, false]) {
        const nm = (raw ? "Lectura directa de " : "Pages de ") + r;
        try {
          const x = await fetch(
            (raw
              ? "https://raw.githubusercontent.com/" +
                OWNER +
                "/" +
                r +
                "/" +
                BR +
                "/"
              : dbBase(r)) +
              "productos.lt?t=" +
              Date.now(),
            { cache: "no-store" },
          );
          ok(nm + ": HTTP " + x.status, x.ok);
        } catch (e) {
          ok(nm + ": sin conexión", false);
        }
      }
    }
    ok("Próximo id libre: " + st.next, true);
  } catch (e) {
    ok(e.message || "Error", false);
  }
  return out;
}
