const test = require('node:test');
const assert = require('node:assert');
const { db, initDb } = require('../db');

test('Database Tags Support', async (t) => {
  await initDb();

  await t.test('projects table has tags column', (t, done) => {
    db.all("PRAGMA table_info(projects)", (err, rows) => {
      assert.ifError(err);
      const columns = rows.map(r => r.name);
      assert.ok(columns.includes('tags'), 'should have tags column');
      done();
    });
  });

  await t.test('can store and retrieve tags', (t, done) => {
    const week = 99;
    const title = 'Test Project';
    const description = 'Test Description';
    const tags = JSON.stringify(['tag1', 'tag2']);

    db.run(
      'INSERT INTO projects (week, title, description, tags) VALUES (?, ?, ?, ?)',
      [week, title, description, tags],
      function(err) {
        // If the column doesn't exist, this insert might fail or ignore the column depending on SQLite version/strictness
        // But the retrieval check below is the real test
        
        db.get('SELECT tags FROM projects WHERE week = ?', [week], (err, row) => {
          assert.ifError(err);
          // If insert failed or column missing, row might be undefined or tags missing
          assert.ok(row, 'Row should exist');
          assert.strictEqual(row.tags, tags, 'Tags should match');
          
          // Clean up
          db.run('DELETE FROM projects WHERE week = ?', [week], () => done());
        });
      }
    );
  });
});
