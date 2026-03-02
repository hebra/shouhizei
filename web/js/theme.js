/**
 * Shouhizei — Theme Management
 * Handles dark/light mode switching and system preference detection.
 */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    if (
      globalThis.matchMedia &&
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  const updateAriaLabel = (theme) => {
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Toggle light mode" : "Toggle dark mode",
      );
    }
  };

  let currentTheme = htmlElement.getAttribute("data-theme") ||
    getPreferredTheme();
  if (!htmlElement.hasAttribute("data-theme")) {
    htmlElement.setAttribute("data-theme", currentTheme);
  }
  updateAriaLabel(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      htmlElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      updateAriaLabel(currentTheme);
    });
  }

  if (globalThis.matchMedia) {
    globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (e) => {
        if (!localStorage.getItem("theme")) {
          currentTheme = e.matches ? "dark" : "light";
          htmlElement.setAttribute("data-theme", currentTheme);
          updateAriaLabel(currentTheme);
        }
      },
    );
  }
});
