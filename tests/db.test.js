const test = require('node:test');
const assert = require('node:assert');
const { db, initDb } = require('../db');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'database.sqlite');

test('Database Schema', async (t) => {
  await initDb();
  // Ensure DB file exists
  await t.test('database file exists', () => {
    assert.strictEqual(fs.existsSync(DB_PATH), true, 'database.sqlite should exist');
  });

  await t.test('projects table exists', (t, done) => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='projects'", (err, row) => {
      assert.ifError(err);
      assert.ok(row, 'projects table should exist');
      done();
    });
  });

  await t.test('projects table has correct columns', (t, done) => {
    db.all("PRAGMA table_info(projects)", (err, rows) => {
      assert.ifError(err);
      const columns = rows.map(r => r.name);
      assert.ok(columns.includes('week'), 'should have week column');
      assert.ok(columns.includes('title'), 'should have title column');
      assert.ok(columns.includes('description'), 'should have description column');
      assert.ok(columns.includes('status'), 'should have status column');
      done();
    });
  });
});
