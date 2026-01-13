const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY week ASC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      // Initialize 52 records
      const stmt = db.prepare('INSERT INTO projects (week, title, description, status) VALUES (?, ?, ?, ?)');
      for (let i = 1; i <= 52; i++) {
        stmt.run(i, `Project ${i}`, `Description for project ${i}`, 'Not Started');
      }
      stmt.finalize((err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // Fetch again after initialization
        db.all('SELECT * FROM projects ORDER BY week ASC', (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(rows);
        });
      });
    } else {
      res.json(rows);
    }
  });
});

module.exports = app;
