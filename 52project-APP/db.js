const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH);

function initDb(database = db) {
  return new Promise((resolve, reject) => {
    database.serialize(() => {
      // Create global_notes table
      database.run(`
        CREATE TABLE IF NOT EXISTS global_notes (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          content TEXT
        )
      `, (err) => {
        if (err) {
          console.error('Error creating global_notes table:', err);
        } else {
          // Ensure the single row exists
          database.run("INSERT OR IGNORE INTO global_notes (id, content) VALUES (1, '')");
        }
      });

      database.run(`
        CREATE TABLE IF NOT EXISTS projects (
          week INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          status TEXT DEFAULT 'Not Started',
          tags TEXT
        )
      `, (err) => {
        if (err) {
            reject(err);
            return;
        }

        // Migration: Check if tags column exists, if not add it
        database.all("PRAGMA table_info(projects)", (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const columns = rows.map(r => r.name);
            if (!columns.includes('tags')) {
                database.run("ALTER TABLE projects ADD COLUMN tags TEXT", (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            } else {
                resolve();
            }
        });
      });
    });
  });
}

module.exports = {
  db,
  initDb
};
