const run = async (f) => {
  if (busy) {
    toast("Espera, publicando…");
    return;
  }
  busy = true;
  try {
    await f();
  } finally {
    busy = false;
  }
};
