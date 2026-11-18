function renderChips() {
  const cs = ["Todo", ...new Set([...CATS, ...P.map((p) => p.c)])];
  $("#chips").innerHTML = cs
    .map(
      (c) =>
        `<button class="chip" aria-pressed="${c === cat}" data-c="${esc(c)}">${esc(c)}</button>`,
    )
    .join("");
}
