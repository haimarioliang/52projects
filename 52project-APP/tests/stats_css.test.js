const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Stats Page CSS', async (t) => {
  const cssPath = path.join(process.cwd(), 'public', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  await t.test('stats-grid uses auto + 13 columns for quarterly layout', () => {
    // Regex to find .stats-grid rule block and check for auto + 13 columns
    assert.match(css, /grid-template-columns:\s*auto\s+repeat\(13,\s*1fr\)/, 'should have label column and 13 data columns');
  });
});
