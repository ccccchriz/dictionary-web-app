const fontButton = document.getElementById("font-button");

["sans-serif", "serif", "mono"].forEach((el) =>
  document.getElementById(el).addEventListener("change", () => {
    document.body.setAttribute("data-font", el);
    fontButton.textContent = el.replace("-", " ");
  })
);

window.addEventListener("click", () => {
  fontButton.setAttribute("aria-expanded", "false");
});

document
  .getElementById("font-fieldset")
  .addEventListener("click", (e) => e.stopPropagation());

fontButton.addEventListener("click", (event) => {
  event.stopPropagation();
  event.target.setAttribute(
    "aria-expanded",
    !(event.target.getAttribute("aria-expanded") == "true")
  );
});

document.getElementById("theme-button").addEventListener("click", (e) => {
  e.target.setAttribute(
    "aria-label",
    e.target.getAttribute("aria-label") == "dark" ? "light" : "dark"
  );
});
