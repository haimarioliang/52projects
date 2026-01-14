const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Quarterly Drawers Structure', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  const scriptJsPath = path.join(publicDir, 'script.js');
  const js = fs.readFileSync(scriptJsPath, 'utf8');

  await t.test('renderProjects logic contains quarter headers', () => {
    assert.ok(js.includes('quarter-header'), 'should have quarter-header class in script.js');
  });

  await t.test('renderProjects logic contains quarter content containers', () => {
    assert.ok(js.includes('quarter-content'), 'should have quarter-content class in script.js');
  });

  await t.test('toggleQuarter function is defined', () => {
    assert.ok(js.includes('function toggleQuarter'), 'should have toggleQuarter function in script.js');
  });
});
