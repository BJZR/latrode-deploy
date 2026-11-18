function connect() {
  openSh(
    '<div class="row"><h2>Conectar GitHub</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div><p class="mu" style="margin-top:8px">Pega un token fine-grained con permiso <b>Contents: Read and write</b> sobre tus repositorios <b>' +
      DB0 +
      '</b>. Se guarda cifrado con tu PIN en este dispositivo.</p><span class="lb">Token</span><input id="gt" type="password" autocomplete="off" placeholder="github_pat_…"><span class="lb">Crea un PIN (6 a 12 números)</span><input id="gp" ' +
      PINF +
      ' placeholder="••••••"><p class="mu er" id="ge"></p><button class="btn" id="gk">Conectar</button>',
  );
  $("#sh").onclick = null;
  $("#cl").onclick = closeSh;
  const gp = $("#gp");
  gp.oninput = () => {
    gp.value = gp.value.replace(/\D/g, "");
  };
  $("#gk").onclick = async () => {
    const t = $("#gt").value.trim(),
      p = gp.value;
    if (!t) {
      $("#ge").textContent = "Pega el token.";
      return;
    }
    if (p.length < 6) {
      $("#ge").textContent = "El PIN debe tener al menos 6 números.";
      return;
    }
    TOK = t;
    try {
      const d = await api("", {}, DB0);
      if (!d.permissions || !d.permissions.push)
        throw Object.assign(
          new Error("El token no tiene permiso de escritura."),
          { status: 1 },
        );
      GH = { box: await seal(t, p) };
      sv("lt_gh", GH);
      admin();
    } catch (e) {
      TOK = "";
      $("#ge").textContent =
        e.status === 1
          ? e.message
          : "No se pudo verificar. Revisa que el token incluya " + DB0 + ".";
    }
  };
}
