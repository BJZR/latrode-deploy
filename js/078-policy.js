function policy(back) {
  openSh(
    '<div class="row"><h2>Privacidad y datos</h2><button class="x" id="cl" aria-label="Cerrar">✕</button></div><p class="mu" style="margin-top:10px">Para gestionar tu pedido te pedimos nombre, celular, dirección y notas. Esos datos se usan solo para ese fin y se envían por WhatsApp al número de la tienda.</p><p class="mu" style="margin-top:8px">Si aceptas, también se guardan en este dispositivo (no en un servidor) para no volver a escribirlos. No usamos cookies de seguimiento ni publicidad.</p><p class="mu" style="margin-top:8px">Puedes borrarlos aquí cuando quieras. Para pedir que borremos datos que ya enviaste por WhatsApp, escríbenos en ese mismo chat.</p><button class="btn s" id="pd">Borrar mis datos de este dispositivo</button><button class="btn" id="pb">Volver</button>',
  );
  $("#cl").onclick = closeSh;
  $("#sh").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.id === "pd") {
      try {
        localStorage.removeItem("lt_cust");
        localStorage.removeItem(K.k);
      } catch (x) {}
      CART = [];
      badge();
      toast("Datos borrados");
    } else if (b.id === "pb") back ? back() : closeSh();
  };
}
