const shardFor = async (need, set) => {
  const last = set.r[set.r.length - 1];
  if ((await usage(last)) + need <= set.l * 1048576) return last;
  const name =
    DB0 +
    "-" +
    (Math.max(0, ...set.r.map((r) => +(r.match(/-(\d+)$/) || [0, 0])[1])) + 1);
  toast("Creando " + name + "…", 0);
  await mkRepo(name);
  if (!(await publish(DB0, "nuevo repositorio " + name, opAddRepo(name))))
    throw new Error(lastErr || "No se pudo registrar " + name);
  CFG = { ...CFG, r: [...set.r, name] };
  return name;
};
