import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { initMobileMenu } from "./mobileMenu.js";
import { initCarousels } from "./carousel.js";

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
