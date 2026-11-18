const publish = async (repo, msg, build, up = [], del = []) => {
  toast("Publicando…", 0);
  for (let k = 0; k < 3; k++) {
    try {
      await commit(repo, "Latrode: " + msg, build, up, [...del]);
      toast("Publicado. Ya se ve en la tienda", 4000);
      return true;
    } catch (e) {
      if ((e.status === 409 || e.status === 422) && k < 2) continue;
      lastErr = e.message || "Error";
      toast(lastErr + ". No se guardó", 6000);
      return false;
    }
  }
  return false;
};
