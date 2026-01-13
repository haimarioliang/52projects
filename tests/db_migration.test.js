const test = require('node:test');
const assert = require('node:assert');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { initDb } = require('../db');

const TEST_DB_PATH = path.join(process.cwd(), 'migration_test.sqlite');

test('Database Migration', async (t) => {
  // Cleanup previous runs
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }

  // 1. Create a "Legacy" DB without the tags column
  await new Promise((resolve, reject) => {
    const db = new sqlite3.Database(TEST_DB_PATH);
    db.serialize(() => {
      db.run(`
        CREATE TABLE projects (
          week INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          status TEXT DEFAULT 'Not Started'
        )
      `, (err) => {
        if (err) reject(err);
        else {
            db.close();
            resolve();
        }
      });
    });
  });

  // 2. Run initDb on this legacy DB
  const db = new sqlite3.Database(TEST_DB_PATH);
  await initDb(db);

  // 3. Verify tags column now exists
  await new Promise((resolve, reject) => {
    db.all("PRAGMA table_info(projects)", (err, rows) => {
      if (err) reject(err);
      const columns = rows.map(r => r.name);
      assert.ok(columns.includes('tags'), 'tags column should have been added');
      resolve();
    });
  });

  db.close();
  // Cleanup
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }
});