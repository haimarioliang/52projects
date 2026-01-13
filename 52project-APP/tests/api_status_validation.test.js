const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { initDb, db } = require('../db');
const app = require('../app');

test('API Status Validation', async (t) => {
  await initDb();

  await t.test('PATCH /api/projects/:week accepts valid statuses', async () => {
    const validStatuses = ['Not Started', 'In Progress', 'Done', 'Failed', 'Skipped'];
    
    for (const status of validStatuses) {
      const res = await request(app)
        .patch('/api/projects/1')
        .send({ status });
      assert.strictEqual(res.status, 200, `Failed for status: ${status}`);
      assert.strictEqual(res.body.status, status);
    }
  });

  await t.test('PATCH /api/projects/:week rejects invalid status', async () => {
    const res = await request(app)
      .patch('/api/projects/1')
      .send({ status: 'Invalid Status' });
    
    assert.strictEqual(res.status, 400); // Expecting Bad Request
  });
});