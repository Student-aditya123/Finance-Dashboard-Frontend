/**
 * Format utility for dates
 * Converts ISO dates to readable format
 */

/**
 * Format date to readable string
 * @param {string | Date} date - ISO date string or Date object
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted date (e.g., "1 Apr 2026")
 */
export const formatDate = (date, locale = 'en-US') => {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        
        if (isNaN(dateObj.getTime())) {
            return 'Invalid date';
        }

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(dateObj);
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid date';
    }
};

/**
 * Format date with time
 * @param {string | Date} date - ISO date string or Date object
 * @param {string} locale - Locale code
 * @returns {string} Formatted date with time (e.g., "1 Apr 2026, 2:30 PM")
 */
export const formatDateTime = (date, locale = 'en-US') => {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        
        if (isNaN(dateObj.getTime())) {
            return 'Invalid date';
        }

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(dateObj);
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid date';
    }
};

/**
 * Get relative time format
 * @param {string | Date} date - ISO date string or Date object
 * @returns {string} Relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date) => {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diffMs = now - dateObj;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    } catch (error) {
        console.error('Relative time formatting error:', error);
        return 'Invalid date';
    }
};