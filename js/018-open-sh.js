function openSh(h) {
  $("#sh").innerHTML = h;
  $("#sh")
    .querySelectorAll(".x")
    .forEach((b) => {
      if (b.textContent === "✕")
        b.innerHTML = IC('<path d="M6 6l12 12M18 6L6 18"/>', 18);
    });
  $("#ov").classList.add("on");
  document.body.style.overflow = "hidden";
}
