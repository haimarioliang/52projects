const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Header Restoration', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const indexHtmlPath = path.join(publicDir, 'index.html');
  const html = fs.readFileSync(indexHtmlPath, 'utf8');

  await t.test('standard nav links are restored to header', () => {
    // We expect <div class="nav-links"> inside <header>
    assert.ok(html.includes('<header>') && html.includes('<div class="nav-links">'), 'should have nav-links in header');
  });

  await t.test('hamburger menu toggle is removed', () => {
    assert.ok(!html.includes('id="menu-toggle"'), 'should NOT have a hamburger menu toggle');
  });

  await t.test('navigation overlay is removed', () => {
    assert.ok(!html.includes('id="nav-overlay"'), 'should NOT have a nav overlay');
  });
});
