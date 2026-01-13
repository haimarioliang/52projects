const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('UI Scaffolding', async (t) => {
  const publicDir = path.join(process.cwd(), 'public');
  
  await t.test('public directory exists', () => {
    assert.strictEqual(fs.existsSync(publicDir), true, 'public/ directory should exist');
  });

  await t.test('index.html exists', () => {
    assert.strictEqual(fs.existsSync(path.join(publicDir, 'index.html')), true, 'index.html should exist');
  });

  await t.test('style.css exists', () => {
    assert.strictEqual(fs.existsSync(path.join(publicDir, 'style.css')), true, 'style.css should exist');
  });

  await t.test('index.html has basic structure', () => {
    const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
    assert.ok(html.includes('<!DOCTYPE html>'), 'should have doctype');
    assert.ok(html.includes('<title>'), 'should have title');
    assert.ok(html.includes('href="style.css"'), 'should link to style.css');
  });

  await t.test('script.js has fetchProjects function', () => {
    const js = fs.readFileSync(path.join(publicDir, 'script.js'), 'utf8');
    assert.ok(js.includes('function fetchProjects') || js.includes('const fetchProjects'), 'should have fetchProjects function');
  });
});
