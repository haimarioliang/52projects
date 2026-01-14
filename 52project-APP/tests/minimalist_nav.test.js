const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Hamburger Navigation Structure', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const indexHtmlPath = path.join(publicDir, 'index.html');
  const html = fs.readFileSync(indexHtmlPath, 'utf8');

  await t.test('standard nav links are removed from header', () => {
    assert.ok(!html.includes('<div class="nav-links">'), 'should NOT have direct nav-links in header');
  });

  await t.test('hamburger menu toggle exists', () => {
    assert.ok(html.includes('id="menu-toggle"'), 'should have a hamburger menu toggle');
  });

  await t.test('navigation overlay exists', () => {
    assert.ok(html.includes('id="nav-overlay"'), 'should have a hidden nav overlay');
  });
});
