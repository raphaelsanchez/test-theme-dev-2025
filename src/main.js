// Reset styles
import "./css/reset.css";

// Tokens
import "./css/tokens.css";

// Fonts
import "./css/fonts.css";

// Bases
import "./css/bases.css";

// List component
import "./css/list.css";

// Button component
import "./css/button.css";

// Navigation component
import "./css/navigation.css";
import { initMobileMenu } from "./js/mobileMenu.js";

// Styles for the project
import "./css/layout.css";

// Utilities
import "./css/utilities.css";

// Accessibility
import "./css/a11y.css";

// Carousel component
import "./css/carousel.css";
import { initCarousels } from "./js/carousel.js";

// Animations component
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Initialize mobile menu
 *
 * @param {number | undefined} breakpoint - The breakpoint to use for the mobile menu
 * @returns {void}
 */
initMobileMenu();

/**
 * Initialize carousels
 *
 * @returns {void}
 */
initCarousels();

/**
 * Initialize AOS (Animate On Scroll)
 *
 * @returns {void}
 */
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
  offset: 100,
});
