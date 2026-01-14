const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/global-notes', (req, res) => {
  db.get('SELECT content FROM global_notes WHERE id = 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || { content: '' });
  });
});

app.patch('/api/global-notes', (req, res) => {
  const { content } = req.body;
  
  db.run('UPDATE global_notes SET content = ? WHERE id = 1', [content], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ content });
  });
});

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

app.patch('/api/projects/:week', (req, res) => {
  const { week } = req.params;
  const { title, description, status, tags } = req.body;

  if (status) {
    const validStatuses = ['Not Started', 'In Progress', 'Done', 'Failed', 'Skipped'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
  }

  const sql = `
    UPDATE projects 
    SET title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        status = COALESCE(?, status),
        tags = COALESCE(?, tags)
    WHERE week = ?
  `;

  db.run(sql, [title, description, status, tags, week], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    db.get('SELECT * FROM projects WHERE week = ?', [week], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

module.exports = app;
