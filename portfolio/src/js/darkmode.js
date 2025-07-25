export function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const root = document.documentElement;

  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark-mode");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
