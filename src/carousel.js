/**
 * Carousel Module
 *
 * Gère le fonctionnement du carousel avec scroll-snap
 * et contrôle via les boutons de navigation
 */

const DEFAULT_BREAKPOINT = 768;

/**
 * Check if we're on mobile
 *
 * @param {number} breakpoint - The breakpoint to use for the carousel
 * @returns {boolean} - True if we're on mobile, false otherwise
 */
const isMobile = (breakpoint = DEFAULT_BREAKPOINT) =>
  window.innerWidth <= breakpoint;

/**
 * Create navigation buttons dynamically
 *
 * @param {HTMLElement} buttonsContainer - The buttons container element
 * @param {number} totalPages - The total number of pages
 * @returns {NodeList} - The created buttons
 */
const createNavigationButtons = (buttonsContainer, totalPages) => {
  // Clear existing buttons
  buttonsContainer.innerHTML = "";

  // Create buttons for each page
  for (let i = 0; i < totalPages; i++) {
    const button = document.createElement("button");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", i === 0 ? "true" : "false");
    button.setAttribute("aria-label", `Page ${i + 1}`);
    buttonsContainer.appendChild(button);
  }

  return buttonsContainer.querySelectorAll("button");
};

/**
 * Get carousel configuration
 *
 * @param {HTMLElement} container - The carousel container
 * @param {number} breakpoint - The breakpoint to use for the carousel
 * @returns {Object} - Carousel configuration object
 */
const getCarouselConfig = (container, breakpoint = DEFAULT_BREAKPOINT) => {
  const itemsContainer = container.querySelector(".carousel-items");
  const buttonsContainer = container.querySelector(
    ".carousel-bullets-controls"
  );
  const items = container.querySelectorAll(".carousel-item");
  const mobile = isMobile(breakpoint);
  const itemsPerPage = mobile ? 1 : 3;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Create navigation buttons dynamically
  const buttons = createNavigationButtons(buttonsContainer, totalPages);

  return {
    container,
    itemsContainer,
    buttonsContainer,
    buttons,
    items,
    mobile,
    itemsPerPage,
    totalPages,
    currentPage: 0,
    isScrolling: false,
  };
};

/**
 * Update carousel buttons state
 *
 * @param {NodeList} buttons - The carousel buttons
 * @param {number} currentPage - The current page index
 * @returns {void}
 */
const updateButtons = (buttons, currentPage) => {
  buttons.forEach((button, index) => {
    const isSelected = index === currentPage;
    button.setAttribute("aria-selected", isSelected);
    button.classList.toggle("active", isSelected);
  });
};

/**
 * Navigate to a specific page
 *
 * @param {Object} config - The carousel configuration
 * @param {number} pageIndex - The target page index
 * @returns {void}
 */
const goToPage = (config, pageIndex) => {
  if (pageIndex < 0 || pageIndex >= config.totalPages) return;

  config.isScrolling = true;
  config.currentPage = pageIndex;

  const containerWidth = config.itemsContainer.offsetWidth;
  const scrollPosition = pageIndex * containerWidth;

  config.itemsContainer.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  updateButtons(config.buttons, config.currentPage);

  // Reset scrolling flag after animation
  setTimeout(() => {
    config.isScrolling = false;
  }, 300);
};

/**
 * Handle carousel scroll
 *
 * @param {Object} config - The carousel configuration
 * @returns {void}
 */
const handleScroll = (config) => {
  if (config.isScrolling) return;

  const scrollLeft = config.itemsContainer.scrollLeft;
  const containerWidth = config.itemsContainer.offsetWidth;
  const newPage = Math.round(scrollLeft / containerWidth);

  if (newPage !== config.currentPage && newPage < config.totalPages) {
    config.currentPage = newPage;
    updateButtons(config.buttons, config.currentPage);
  }
};

/**
 * Handle carousel resize
 *
 * @param {Object} config - The carousel configuration
 * @param {number} breakpoint - The breakpoint to use for the carousel
 * @returns {void}
 */
const handleResize = (config, breakpoint = DEFAULT_BREAKPOINT) => {
  const wasMobile = config.mobile;
  config.mobile = isMobile(breakpoint);
  config.itemsPerPage = config.mobile ? 1 : 3;
  const newTotalPages = Math.ceil(config.items.length / config.itemsPerPage);

  // If total pages changed or switching between mobile and desktop
  if (newTotalPages !== config.totalPages || wasMobile !== config.mobile) {
    config.totalPages = newTotalPages;

    // Recreate navigation buttons
    config.buttons = createNavigationButtons(
      config.buttonsContainer,
      config.totalPages
    );

    // Reattach event listeners
    config.buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        goToPage(config, index);
      });
    });

    // Adjust current page if needed
    if (config.currentPage >= config.totalPages) {
      config.currentPage = config.totalPages - 1;
    }

    goToPage(config, config.currentPage);
  }
};

/**
 * Handle keyboard navigation
 *
 * @param {KeyboardEvent} e - The keyboard event
 * @param {Object} config - The carousel configuration
 * @returns {void}
 */
const handleKeydown = (e, config) => {
  if (!config.container.contains(document.activeElement)) return;

  switch (e.key) {
    case "ArrowLeft": {
      e.preventDefault();
      const prevPage =
        config.currentPage > 0 ? config.currentPage - 1 : config.totalPages - 1;
      goToPage(config, prevPage);
      break;
    }
    case "ArrowRight": {
      e.preventDefault();
      const nextPage =
        config.currentPage < config.totalPages - 1 ? config.currentPage + 1 : 0;
      goToPage(config, nextPage);
      break;
    }
    case "Home":
      e.preventDefault();
      goToPage(config, 0);
      break;
    case "End":
      e.preventDefault();
      goToPage(config, config.totalPages - 1);
      break;
  }
};

/**
 * Setup carousel event listeners
 *
 * @param {Object} config - The carousel configuration
 * @param {number} breakpoint - The breakpoint to use for the carousel
 * @returns {void}
 */
const setupEventListeners = (config, breakpoint = DEFAULT_BREAKPOINT) => {
  // Button click listeners
  config.buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      goToPage(config, index);
    });
  });

  // Scroll listener
  config.itemsContainer.addEventListener("scroll", () => {
    handleScroll(config);
  });

  // Resize listener
  window.addEventListener("resize", () => {
    handleResize(config, breakpoint);
  });

  // Keyboard listener
  config.container.addEventListener("keydown", (e) => {
    handleKeydown(e, config);
  });
};

/**
 * Initialize a single carousel
 *
 * @param {HTMLElement} container - The carousel container
 * @param {number} breakpoint - The breakpoint to use for the carousel
 * @returns {Object} - The carousel configuration object
 */
export const initCarousel = (container, breakpoint = DEFAULT_BREAKPOINT) => {
  if (!container) return null;

  const config = getCarouselConfig(container, breakpoint);

  if (
    !config.itemsContainer ||
    !config.buttons.length ||
    !config.items.length
  ) {
    return null;
  }

  setupEventListeners(config, breakpoint);
  updateButtons(config.buttons, config.currentPage);
  handleResize(config, breakpoint);

  return config;
};

/**
 * Initialize all carousels on the page
 *
 * @param {number} breakpoint - The breakpoint to use for the carousels
 * @returns {void}
 */
export const initCarousels = (breakpoint = DEFAULT_BREAKPOINT) => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((container) => {
    initCarousel(container, breakpoint);
  });
};
