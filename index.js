const theme = localStorage.getItem("theme");
const font = localStorage.getItem("font");

const fontButton = document.getElementById("font-button");

["sans-serif", "serif", "mono"].forEach((el) =>
  document.getElementById(el).addEventListener("change", () => {
    document.body.setAttribute("data-font", el);
    fontButton.textContent = el.replace("-", " ");
    localStorage.setItem("font", el);
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
  const newTheme =
    document.getElementById("theme-button").getAttribute("aria-label") == "dark"
      ? "light"
      : "dark";
  document.getElementById("theme-button").setAttribute("aria-label", newTheme);
  localStorage.setItem("theme", newTheme);
});

if (theme)
  document.getElementById("theme-button").setAttribute("aria-label", theme);

if (font) {
  document.body.setAttribute("data-font", font);
  fontButton.textContent = font.replace("-", " ");
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  document.getElementById("theme-button").setAttribute("aria-label") = "light"
}
