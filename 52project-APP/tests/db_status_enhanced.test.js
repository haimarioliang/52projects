const test = require('node:test');
const assert = require('node:assert');
const sqlite3 = require('sqlite3').verbose();
const { initDb } = require('../db');

test('Database Status Support', async (t) => {
  const db = new sqlite3.Database(':memory:');
  
  await initDb(db);

  await t.test('supports all new status values', (t, done) => {
    const statuses = ['Not Started', 'In Progress', 'Done', 'Failed', 'Skipped'];
    
    db.serialize(() => {
      const stmt = db.prepare("INSERT INTO projects (week, status) VALUES (?, ?)");
      
      statuses.forEach((status, index) => {
        stmt.run(index + 1, status);
      });
      stmt.finalize();

      db.all("SELECT week, status FROM projects ORDER BY week", (err, rows) => {
        if (err) {
            assert.fail(err);
        }
        assert.strictEqual(rows.length, 5);
        rows.forEach((row, index) => {
            assert.strictEqual(row.status, statuses[index]);
        });
        done();
      });
    });
  });
});
