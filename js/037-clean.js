const clean = (v) =>
  String(v)
    .replace(/[\r\n]+/g, " ")
    .trim();
