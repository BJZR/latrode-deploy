const sv = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch (e) {
    toast("No se pudo guardar: memoria llena");
    return false;
  }
};
