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
