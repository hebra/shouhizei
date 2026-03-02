/**
 * Utility functions for Shouhizei
 */

/**
 * Format a number as currency
 * @param {number} value - The amount to format
 * @param {string} symbol - Currency symbol (default "")
 * @returns {string} Formatted currency string
 */
// deno-lint-ignore no-unused-vars
const formatCurrency = (value, symbol = "") => {
  return symbol + parseFloat(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Sanitize and parse a numeric input
 * @param {string} value - The input value string
 * @returns {number} Parsed float or 0 if invalid
 */
// deno-lint-ignore no-unused-vars
const parseNumericInput = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
// deno-lint-ignore no-unused-vars
const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Copy text to clipboard and provide visual feedback
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} Success or failure
 */
// deno-lint-ignore no-unused-vars
const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {number} duration - The duration in ms (default 3000)
 */
// deno-lint-ignore no-unused-vars
const showToast = (message, duration = 3000) => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add("show"), 10);

  // Fade out
  setTimeout(() => {
    toast.classList.add("fade-out");
    // Remove from DOM after fade animation
    setTimeout(() => toast.remove(), 300);
  }, duration);
};
