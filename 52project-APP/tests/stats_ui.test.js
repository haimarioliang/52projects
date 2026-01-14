const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Stats Page UI', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const statsHtmlPath = path.join(publicDir, 'stats.html');
  
  await t.test('stats.html exists', () => {
    assert.strictEqual(fs.existsSync(statsHtmlPath), true, 'stats.html should exist');
  });

  await t.test('stats.html has required structure', () => {
    const html = fs.readFileSync(statsHtmlPath, 'utf8');
    assert.ok(html.includes('id="stats-grid"'), 'should have stats-grid container');
    assert.ok(!html.includes('id="progress-bar"'), 'should NOT have progress-bar');
    assert.ok(html.includes('id="progress-text"'), 'should have progress-text');
    assert.ok(html.includes('id="nav-overlay"'), 'should have navigation overlay');
  });

  await t.test('script.js has fetchStats function', () => {
    const js = fs.readFileSync(path.join(publicDir, 'script.js'), 'utf8');
    assert.ok(js.includes('function fetchStats') || js.includes('const fetchStats'), 'should have fetchStats function');
  });

  await t.test('script.js has renderStats function', () => {
    const js = fs.readFileSync(path.join(publicDir, 'script.js'), 'utf8');
    assert.ok(js.includes('function renderStats') || js.includes('const renderStats'), 'should have renderStats function');
  });
});
