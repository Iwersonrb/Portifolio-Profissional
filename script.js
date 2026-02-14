document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("dark-mode-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("theme-label");
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const btnTopo = document.getElementById("btn-topo");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        if (themeIcon) themeIcon.className = "fas fa-sun";
        if (themeLabel) themeLabel.textContent = "Modo claro";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            const isDark = body.classList.contains("dark");
            if (themeIcon) themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            if (themeLabel) themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("show");
        });

        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove("show");
            }
        });
    }

    if (btnTopo) {
        window.addEventListener("scroll", () => {
            btnTopo.style.display = window.scrollY > 280 ? "block" : "none";
        });

        btnTopo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const projetoCards = document.querySelectorAll("#projetos .projeto");
    projetoCards.forEach((card) => {
        const link = card.querySelector("a[href]");
        if (!link) return;

        card.setAttribute("role", "link");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", link.getAttribute("aria-label") || `Abrir projeto ${link.textContent.trim()}`);

        const openLink = () => {
            if (link.target === "_blank") {
                window.open(link.href, "_blank", "noopener,noreferrer");
            } else {
                window.location.href = link.href;
            }
        };

        card.addEventListener("click", (event) => {
            if (event.target.closest("a, button")) return;
            openLink();
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLink();
            }
        });
    });
});
