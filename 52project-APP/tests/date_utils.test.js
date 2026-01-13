const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// We'll create public/utils.js
const UTILS_PATH = path.join(process.cwd(), 'public', 'utils.js');

test('Date Utilities', async (t) => {
  if (!fs.existsSync(UTILS_PATH)) {
    assert.fail('public/utils.js does not exist');
  }

  const { getWeekRange } = require('../public/utils');

  await t.test('calculates Week 1 correctly', () => {
    const year = 2026;
    const range = getWeekRange(1, year);
    assert.strictEqual(range, 'Jan 1 - Jan 7');
  });

  await t.test('calculates Week 52 correctly (non-leap year)', () => {
    const year = 2025; // 2025 is not a leap year
    const range = getWeekRange(52, year);
    // 52 * 7 = 364. 
    // Week 1: 1-7 (7 days)
    // Week 52: 358-364 (Dec 24 - Dec 30)
    // Actually, simple logic (week - 1) * 7.
    // Week 1 starts day 0 (Jan 1) -> ends day 6 (Jan 7)
    // Week 52 starts day 357 -> ends day 363.
    // Let's verify Dec dates.
    assert.strictEqual(range, 'Dec 24 - Dec 30');
  });

  await t.test('handles leap year correctly', () => {
    const year = 2024; // Leap year
    const range = getWeekRange(9, year); // Week 9 includes Feb 29 or is just after
    // Week 1: Jan 1-7
    // Week 8: Feb 19 - Feb 25
    // Week 9: Feb 26 - Mar 3 (in leap year)
    // In non-leap year Week 9: Feb 26 - Mar 4
    assert.strictEqual(range, 'Feb 26 - Mar 3');
  });
});
