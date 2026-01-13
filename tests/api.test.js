const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { initDb, db } = require('../db');

// We'll create app.js later, but the test will require it
const app = require('../app');

test('API Endpoints', async (t) => {
  await initDb();
  
  // Clear table to test initialization
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM projects', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await t.test('GET /api/projects returns 52 projects', async () => {
    const res = await request(app).get('/api/projects');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(Array.isArray(res.body), true);
    assert.strictEqual(res.body.length, 52);
    assert.strictEqual(res.body[0].week, 1);
    assert.strictEqual(res.body[51].week, 52);
  });
});
