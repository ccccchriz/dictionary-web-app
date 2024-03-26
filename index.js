["sans-serif", "serif", "mono"].forEach((el) =>
  document.getElementById(el).addEventListener("change", () => {
    document.body.setAttribute("data-font", el);
    document.getElementById("font-button").textContent = el.replace("-", " ");
  })
);

document.getElementById("font-button").addEventListener("click", (el) => {
  el.target.setAttribute(
    "aria-expanded",
    !(el.target.getAttribute("aria-expanded") == "true")
  );
});
