const cols = (v) =>
  (v || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => {
      const [a, b] = x.split(":");
      return {
        n: a.trim(),
        h: /^#[0-9a-f]{3,8}$/i.test((b || "").trim()) ? b.trim() : "#888888",
      };
    });
