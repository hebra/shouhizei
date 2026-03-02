/**
 * Core Calculator Logic for Shouhizei
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const countrySelect = document.getElementById("country-select");
  const taxRateInput = document.getElementById("tax-rate");
  const priceExclInput = document.getElementById("price-without-tax");
  const priceInclInput = document.getElementById("price-with-tax");
  const taxRateLabel = document.getElementById("tax-rate-label");
  const form = document.getElementById("calculator-form");
  const priceExclPrefix = document.getElementById("price-excl-prefix");
  const priceInclPrefix = document.getElementById("price-incl-prefix");

  // Results Elements
  const resExclTax = document.getElementById("res-excl-tax");
  const resTaxLabel = document.getElementById("res-tax-label");
  const resTaxValue = document.getElementById("res-tax-value");
  const resInclTax = document.getElementById("res-incl-tax");

  let ratesData = null;
  let currentSymbol = "";

  /**
   * Initialize the calculator by fetching rates
   */
  const init = async () => {
    try {
      const response = await fetch("js/rates.json");
      if (!response.ok) throw new Error("Failed to load rates data");
      ratesData = await response.json();
      populateCountries();
    } catch (error) {
      console.error("Error initializing calculator:", error);
      // Fallback: Default to no country selected
      countrySelect.value = "";
      handleCountryChange();
    }
  };

  /**
   * Populate country dropdown from JSON data
   */
  const populateCountries = () => {
    if (!ratesData || !ratesData.tax_data) return;

    ratesData.tax_data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.code;
      option.textContent = item.country;
      countrySelect.appendChild(option);
    });

    // Restore selected country from localStorage
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      countrySelect.value = storedCountry;
      handleCountryChange();
    }
  };

  /**
   * Handle changes in country selection
   */
  const handleCountryChange = () => {
    const selectedCode = countrySelect.value;
    
    // Remember selection
    if (selectedCode) {
      localStorage.setItem("selectedCountry", selectedCode);
    } else {
      localStorage.removeItem("selectedCountry");
    }

    if (!selectedCode) {
      taxRateLabel.textContent = "Tax Rate (%)";
      resTaxLabel.textContent = "Tax Amount:";
      taxRateInput.value = "0";
      currentSymbol = "";
    } else {
      const countryInfo = ratesData.tax_data.find((c) =>
        c.code === selectedCode
      );
      if (countryInfo) {
        taxRateInput.value = countryInfo.rate;
        taxRateLabel.textContent = `${countryInfo.tax_type} Rate (%)`;
        resTaxLabel.textContent = `${countryInfo.tax_type} Amount:`;
        currentSymbol = countryInfo.symbol || "";
      }
    }

    // Update prefixes and padding
    priceExclPrefix.textContent = currentSymbol;
    priceInclPrefix.textContent = currentSymbol;

    if (currentSymbol) {
      priceExclInput.classList.add("pl-10");
      priceInclInput.classList.add("pl-10");
    } else {
      priceExclInput.classList.remove("pl-10");
      priceInclInput.classList.remove("pl-10");
    }

    // Recalculate based on current inputs
    updateCalculations("excl");
  };

  /**
   * Perform calculations and update UI
   * @param {string} source - 'excl' or 'incl' depending on which field was edited
   */
  const updateCalculations = (source) => {
    const taxRate = parseNumericInput(taxRateInput.value);
    const taxFactor = taxRate / 100;

    let priceExcl = 0;
    let priceIncl = 0;
    let taxAmount = 0;

    if (source === "excl") {
      priceExcl = parseNumericInput(priceExclInput.value);
      taxAmount = priceExcl * taxFactor;
      priceIncl = priceExcl + taxAmount;
      priceInclInput.value = priceIncl > 0 ? priceIncl.toFixed(2) : "";
    } else {
      priceIncl = parseNumericInput(priceInclInput.value);
      priceExcl = priceIncl / (1 + taxFactor);
      taxAmount = priceIncl - priceExcl;
      priceExclInput.value = priceExcl > 0 ? priceExcl.toFixed(2) : "";
    }

    // Update Results Display
    resExclTax.textContent = formatCurrency(priceExcl, currentSymbol);
    resTaxValue.textContent = formatCurrency(taxAmount, currentSymbol);
    resInclTax.textContent = formatCurrency(priceIncl, currentSymbol);
  };

  // Event Listeners
  countrySelect.addEventListener("change", handleCountryChange);

  taxRateInput.addEventListener("input", () => {
    // If rate changes manually, we recalculate using priceExcl as source
    updateCalculations("excl");
  });

  priceExclInput.addEventListener("input", () => {
    updateCalculations("excl");
  });

  priceInclInput.addEventListener("input", () => {
    updateCalculations("incl");
  });

  form.addEventListener("reset", () => {
    // Timeout to let the reset happen before updating display
    setTimeout(() => {
      handleCountryChange();
    }, 0);
  });

  // Start initialization
  init();
});
