const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Typography Audit', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const styleCssPath = path.join(publicDir, 'style.css');
  const css = fs.readFileSync(styleCssPath, 'utf8');

  await t.test('all elements should have a monospaced font stack', () => {
    // Check if the file contains the universal selector setting font-family to monospace
    assert.ok(css.includes('*') && css.includes('font-family:') && css.includes('monospace'), 'CSS should have universal monospace font setting');
  });

  await t.test('input elements should explicitly use the monospace stack', () => {
    assert.ok(css.includes('input') || css.includes('textarea'), 'CSS should have form element selectors');
    assert.match(css, /(input|textarea|button|select)\s*\{[^}]*font-family:\s*(inherit|['"]?[^'"]*mono)/, 'form elements should use monospaced fonts');
  });
});