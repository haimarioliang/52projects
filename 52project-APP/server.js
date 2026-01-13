const app = require('./app');
const { initDb } = require('./db');

const PORT = 3000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
