const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { initDb, db } = require('../db');
const app = require('../app');

test('API Enhanced Features', async (t) => {
  await initDb();
  
  // Clear table to start fresh
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM projects', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Trigger initialization
  await request(app).get('/api/projects');

  await t.test('PATCH /api/projects/:week updates tags', async () => {
    const tags = JSON.stringify(['urgent', 'frontend']);
    const res = await request(app)
      .patch('/api/projects/1')
      .send({ tags });
    
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.week, 1);
    assert.strictEqual(res.body.tags, tags);

    const getRes = await request(app).get('/api/projects');
    const project = getRes.body.find(p => p.week === 1);
    assert.strictEqual(project.tags, tags);
  });

  await t.test('PATCH /api/projects/:week supports new statuses', async () => {
    const statuses = ['Skipped', 'Failed'];
    
    for (const status of statuses) {
      const res = await request(app)
        .patch('/api/projects/2')
        .send({ status });
      
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, status);

      const getRes = await request(app).get('/api/projects');
      const project = getRes.body.find(p => p.week === 2);
      assert.strictEqual(project.status, status);
    }
  });
});
