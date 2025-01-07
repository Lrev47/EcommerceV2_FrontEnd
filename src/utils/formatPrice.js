// src/utils/formatPrice.js

/**
 * formatPrice(value, currency)
 *
 * @param {number} value    - The numeric price value (e.g. 12.5).
 * @param {string} currency - The currency code (e.g. 'USD', 'EUR'). Defaults to 'USD'.
 * @param {string} locale   - The locale code (e.g. 'en-US'). Defaults to 'en-US'.
 *
 * @return {string}         - A properly formatted currency string (e.g. "$12.50").
 */
export default function formatPrice(value, currency = "USD", locale = "en-US") {
  if (typeof value !== "number") {
    return "";
  }
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // minimumFractionDigits: 2, // optional if you want fixed 2 decimal places
    // maximumFractionDigits: 2,
  });
  return formatter.format(value);
}
