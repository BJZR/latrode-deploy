async function load() {
  try {
    try {
      localStorage.removeItem("lt_local");
    } catch (e) {}
    const get = async (n) => {
      for (const raw of [true, false]) {
        try {
          const r = await fetch(
            (raw
              ? "https://raw.githubusercontent.com/" +
                OWNER +
                "/" +
                n +
                "/" +
                BR +
                "/"
              : dbBase(n)) +
              "productos.lt?t=" +
              Date.now(),
            { cache: "no-store" },
          );
          if (r.ok) return r.text();
        } catch (e) {}
      }
      throw new Error("no responde " + n);
    };
    const d0 = parseLT(await get(DB0), DB0),
      set = setOf(d0.S);
    CFG = { ...CFG, wa: set.wa, nq: set.nq, o: set.o, r: set.r, l: set.l };
    const rest = await Promise.all(
      set.r
        .filter((n) => n !== DB0)
        .map((n) =>
          get(n).then(
            (t) => parseLT(t, n).P,
            () => [],
          ),
        ),
    );
    P = [...d0.P, ...rest.flat()];
    LERR = "";
  } catch (e) {
    LERR = e.message || "error";
    if (
      location.protocol === "file:" ||
      /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    )
      P = SEED.map((p) => ({ ...p, sh: DB0 }));
  }
  P = ordered();
  refresh();
}
