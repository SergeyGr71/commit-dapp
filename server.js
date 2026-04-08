const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// временное хранилище
let commitments = [];

// создать commitment
app.post('/commit', (req, res) => {
  const { title, description, deadline } = req.body;

  const newCommit = {
    id: Date.now(),
    title,
    description,
    deadline,
    status: 'pending'
  };

  commitments.push(newCommit);

  res.json(newCommit);
});

// получить все commitments
app.get('/commits', (req, res) => {
  res.json(commitments);
});

// тест
app.get('/', (req, res) => {
  res.send('Commit App is running 🚀');
});
// отметить как выполнено
app.post('/commit/:id/complete', (req, res) => {
  const id = Number(req.params.id);
  const commit = commitments.find(c => c.id === id);

  if (!commit) {
    return res.status(404).json({ error: 'Not found' });
  }

  commit.status = 'completed';
  res.json(commit);
});

// отметить как провалено
app.post('/commit/:id/fail', (req, res) => {
  const id = Number(req.params.id);
  const commit = commitments.find(c => c.id === id);

  if (!commit) {
    return res.status(404).json({ error: 'Not found' });
  }

  commit.status = 'failed';
  res.json(commit);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});