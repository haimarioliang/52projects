const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const UTILS_PATH = path.join(process.cwd(), 'public', 'utils.js');

test('Date Utilities - Monday to Monday', async (t) => {
  if (!fs.existsSync(UTILS_PATH)) {
    assert.fail('public/utils.js does not exist');
  }

  const { getWeekRange } = require('../public/utils');

  await t.test('calculates Week 1 for 2026 (Starts previous year Monday)', () => {
    // Jan 1 2026 is Thursday. Monday of that week is Dec 29 2025.
    const year = 2026;
    const range = getWeekRange(1, year);
    // We expect "Dec 29 - Jan 4" or "Dec 29, 2025 - Jan 4, 2026" ? 
    // The current format is "Mon DD - Mon DD".
    // Let's assume the user wants the standard format.
    assert.strictEqual(range, 'Dec 29 - Jan 4');
  });

  await t.test('calculates Week 2 for 2026', () => {
    const year = 2026;
    const range = getWeekRange(2, year);
    assert.strictEqual(range, 'Jan 5 - Jan 11');
  });

  await t.test('calculates Week 1 for 2024 (Leap Year, Jan 1 is Monday)', () => {
    // Jan 1 2024 is Monday. So Week 1 starts Jan 1.
    const year = 2024;
    const range = getWeekRange(1, year);
    assert.strictEqual(range, 'Jan 1 - Jan 7');
  });
});