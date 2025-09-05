/**
 *  Mobile Menu Module
 *
 *  @param {number} breakpoint - The breakpoint to use for the mobile menu
 *  @returns {void}
 */

const DEFAULT_BREAKPOINT = 768;

/**
 * Check if we're on mobile
 *
 * @param {number} breakpoint - The breakpoint to use for the mobile menu
 * @returns {boolean} - True if we're on mobile, false otherwise
 */
const isMobile = (breakpoint = DEFAULT_BREAKPOINT) =>
  window.innerWidth <= breakpoint;

/**
 * Initialize menu state
 *
 * @param {HTMLElement} menuButton - The menu button element
 * @param {HTMLElement} mobileMenu - The mobile menu element
 * @param {number} breakpoint - The breakpoint to use for the mobile menu
 * @returns {void}
 */
const initializeMenuState = (
  menuButton,
  mobileMenu,
  breakpoint = DEFAULT_BREAKPOINT
) => {
  if (isMobile(breakpoint)) {
    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open mobile menu");
  } else {
    mobileMenu.removeAttribute("aria-hidden");
    // Remove prevent-scroll class when switching to desktop
    document.body.classList.remove("prevent-scroll");
  }
};

/**
 * Handle menu toggle
 *
 * @param {HTMLElement} menuButton - The menu button element
 * @param {HTMLElement} mobileMenu - The mobile menu element
 * @param {number} breakpoint - The breakpoint to use for the mobile menu
 * @returns {void}
 */
const handleMenuToggle = (
  menuButton,
  mobileMenu,
  breakpoint = DEFAULT_BREAKPOINT
) => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", !isExpanded);

  if (isMobile(breakpoint)) {
    mobileMenu.setAttribute("aria-hidden", isExpanded);

    // Toggle prevent-scroll class on body
    if (isExpanded) {
      document.body.classList.remove("prevent-scroll");
    } else {
      document.body.classList.add("prevent-scroll");
    }
  }

  menuButton.setAttribute(
    "aria-label",
    isExpanded ? "Open mobile menu" : "Close mobile menu"
  );
};

/**
 * Initialize the mobile menu
 *
 * @param {number} breakpoint - The breakpoint to use for the mobile menu
 * @returns {void}
 */
export const initMobileMenu = (breakpoint = DEFAULT_BREAKPOINT) => {
  const menuButton = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".nav-container");

  if (!menuButton || !mobileMenu) return;

  /**
   * Add event listener to menu button
   *
   * @param {Event} e - The event object
   * @returns {void}
   */
  menuButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleMenuToggle(menuButton, mobileMenu, breakpoint);
  });

  /**
   * Handle window resize
   *
   * @returns {void}
   */
  window.addEventListener("resize", () => {
    initializeMenuState(menuButton, mobileMenu, breakpoint);
  });

  /**
   * Initialize menu state on page load
   *
   * @returns {void}
   */
  initializeMenuState(menuButton, mobileMenu, breakpoint);
};
