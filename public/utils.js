function getWeekRange(week, year) {
    const startDate = new Date(year, 0, 1 + (week - 1) * 7);
    const endDate = new Date(year, 0, 1 + (week - 1) * 7 + 6);

    const format = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return `${format(startDate)} - ${format(endDate)}`;
}

if (typeof module !== 'undefined') {
    module.exports = { getWeekRange };
}
