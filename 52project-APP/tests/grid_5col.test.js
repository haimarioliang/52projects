const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Dashboard 5-Column Grid', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const styleCssPath = path.join(publicDir, 'style.css');
  const css = fs.readFileSync(styleCssPath, 'utf8');

  await t.test('quarter-content should use 5 columns on desktop', () => {
    // We expect .quarter-content { grid-template-columns: repeat(5, 1fr) }
    assert.match(css, /\.quarter-content\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*1fr\)/, 'should have 5 columns for quarterly content');
  });

  await t.test('dashboard and quarterly headers should have max-width 1400px', () => {
    assert.match(css, /#dashboard\s*\{[^}]*max-width:\s*1400px/, 'dashboard should be 1400px wide');
    assert.match(css, /\.quarter-header\s*\{[^}]*max-width:\s*1400px/, 'quarter headers should be 1400px wide');
  });

  await t.test('should have 3-column breakpoint for tablets', () => {
    // We expect a media query for ~1024px or 992px that sets 3 columns
    assert.match(css, /@media\s*\(max-width:\s*1024px\)\s*\{[^}]*\.quarter-content\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\)/, 'should have 3 columns at 1024px');
  });
});
