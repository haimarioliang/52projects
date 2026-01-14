const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { initDb, db } = require('../db');
const app = require('../app');

test('API Global Notes Support', async (t) => {
  await initDb();

  await t.test('GET /api/global-notes returns initial empty string', async () => {
    const res = await request(app).get('/api/global-notes');
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.content !== undefined);
  });

  await t.test('PATCH /api/global-notes updates content', async () => {
    const content = 'My global dumb ideas list.';
    const res = await request(app)
      .patch('/api/global-notes')
      .send({ content });
    
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.content, content);

    const getRes = await request(app).get('/api/global-notes');
    assert.strictEqual(getRes.body.content, content);
  });
});
