const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('Project initialization', async (t) => {
  await t.test('package.json exists', () => {
    assert.strictEqual(fs.existsSync(path.join(process.cwd(), 'package.json')), true, 'package.json should exist');
  });

  await t.test('dependencies are installed', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    assert.ok(pkg.dependencies.express, 'express should be installed');
    assert.ok(pkg.dependencies.sqlite3, 'sqlite3 should be installed');
    assert.ok(pkg.dependencies.cors, 'cors should be installed');
  });
});
