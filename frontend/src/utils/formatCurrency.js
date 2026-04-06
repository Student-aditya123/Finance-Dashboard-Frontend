/**
 * Utility function to format currency values to INR
 * Uses Intl.NumberFormat for locale-aware formatting
 */

export const formatCurrency = (value, options = {}) => {
    const {
        locale = 'en-IN',
        currency = 'INR',
        minimumFractionDigits = 0,
        maximumFractionDigits = 2,
        showSymbol = true,
    } = options;

    if (value === null || value === undefined) {
        return '₹0';
    }

    try {
        const formatter = new Intl.NumberFormat(locale, {
            style: showSymbol ? 'currency' : 'decimal',
            currency,
            minimumFractionDigits,
            maximumFractionDigits,
        });

        return formatter.format(Number(value));
    } catch (error) {
        console.warn(`Error formatting currency: ${error.message}`);
        return `₹${Number(value).toLocaleString('en-IN')}`;
    }
};

/**
 * Format currency with compact notation (e.g., 1.2M, 500K)
 */
export const formatCurrencyCompact = (value) => {
    if (value === null || value === undefined) return '₹0';

    const num = Number(value);
    const absNum = Math.abs(num);

    if (absNum >= 10000000) {
        return `₹${(num / 10000000).toFixed(1)}Cr`;
    }
    if (absNum >= 100000) {
        return `₹${(num / 100000).toFixed(1)}L`;
    }
    if (absNum >= 1000) {
        return `₹${(num / 1000).toFixed(1)}K`;
    }

    return formatCurrency(num);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value, decimals = 2) => {
    if (value === null || value === undefined) return '0%';
    return `${(Number(value)).toFixed(decimals)}%`;
};