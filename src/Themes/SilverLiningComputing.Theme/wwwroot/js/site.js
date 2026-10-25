document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#menucontainer");

    if (!header || !toggle || !menu) {
        console.warn("Navigation toggle: required element not found.");
        return;
    }

    toggle.setAttribute("aria-controls", "menucontainer");
    toggle.setAttribute("aria-expanded", "false");

    const isMobile = () => window.matchMedia("(max-width: 700px)").matches;

    function setMenuOpen(open) {
        header.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    }

    function toggleMenu() {
        setMenuOpen(!header.classList.contains("is-open"));
    }

    toggle.addEventListener("click", toggleMenu);

    // Keep keyboard support because the template uses a div as the toggle.
    toggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        } else if (event.key === "Escape") {
            setMenuOpen(false);
            toggle.focus();
        }
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a") && isMobile()) {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (!isMobile()) setMenuOpen(false);
    });
});
