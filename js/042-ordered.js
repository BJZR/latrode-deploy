const ordered = (list = P, o = CFG.o) =>
  [...list].sort((a, b) => (num(b.id) - num(a.id)) * (o === "abajo" ? -1 : 1));
