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

  await t.test('PATCH /api/projects/:week updates project data', async () => {
    const updateData = {
      title: 'New Title',
      description: 'New Description',
      status: 'In Progress'
    };
    const res = await request(app)
      .patch('/api/projects/1')
      .send(updateData);
    
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.week, 1);
    assert.strictEqual(res.body.title, 'New Title');
    assert.strictEqual(res.body.description, 'New Description');
    assert.strictEqual(res.body.status, 'In Progress');

    // Verify in DB
    const getRes = await request(app).get('/api/projects');
    const project1 = getRes.body.find(p => p.week === 1);
    assert.strictEqual(project1.title, 'New Title');
  });
});
