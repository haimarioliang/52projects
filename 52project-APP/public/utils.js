function getWeekRange(week, year) {
    // Find the Monday of the week containing Jan 1st
    const jan1 = new Date(year, 0, 1);
    const dayOfWeek = jan1.getDay(); // 0 (Sun) to 6 (Sat)
    
    // Calculate days to subtract to get to the previous Monday
    // Mon(1) -> 0, Tue(2) -> 1, ..., Sun(0) -> 6
    const daysToSubtract = (dayOfWeek + 6) % 7;
    
    const week1Start = new Date(jan1);
    week1Start.setDate(jan1.getDate() - daysToSubtract);
    
    const start = new Date(week1Start);
    start.setDate(week1Start.getDate() + (week - 1) * 7);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const format = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return `${format(start)} - ${format(end)}`;
}

if (typeof module !== 'undefined') {
    module.exports = { getWeekRange };
}
