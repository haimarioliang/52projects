const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Dashboard Grid Refinement', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const styleCssPath = path.join(publicDir, 'style.css');
  const css = fs.readFileSync(styleCssPath, 'utf8');

  await t.test('quarter-content enforces 4-column grid on desktop', () => {
    // We expect .quarter-content { grid-template-columns: repeat(4, 1fr) }
    assert.match(css, /\.quarter-content\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/, 'should have 4 columns for quarterly content');
  });

  await t.test('quarter-content uses 2 columns on mobile', () => {
    // Check if the media query for 768px contains the 2-column rule for quarter-content
    // We'll search for the rule specifically
    const mobileRule = css.split('@media (max-width: 768px)')[1];
    assert.ok(mobileRule.includes('.quarter-content') && mobileRule.includes('grid-template-columns: repeat(2, 1fr)'), 'should have 2 columns on mobile');
  });
});
