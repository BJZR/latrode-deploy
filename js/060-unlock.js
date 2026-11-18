function unlock() {
  openSh(
    '<div class="row"><h2>Administrador</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div><span class="lb">Ingresa tu PIN</span><input id="pn" ' +
      PINF +
      ' placeholder="••••••"><p class="mu er" id="pe"></p><button class="btn" id="pk">Entrar</button><button class="btn s" id="rc">Reconectar con otro token</button>',
  );
  $("#sh").onclick = null;
  $("#cl").onclick = closeSh;
  const i = $("#pn");
  i.oninput = () => {
    i.value = i.value.replace(/\D/g, "");
  };
  setTimeout(() => i.focus(), 60);
  const go = async () => {
    try {
      TOK = await unseal(GH.box, i.value);
      admin();
    } catch (e) {
      $("#pe").textContent = "PIN incorrecto";
      i.value = "";
      i.focus();
    }
  };
  $("#pk").onclick = go;
  i.onkeydown = (e) => {
    if (e.key === "Enter") go();
  };
  $("#rc").onclick = connect;
}
