const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'fires.json';

function loadFires() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveFires(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/fires', (req, res) => res.json(loadFires()));
app.post('/api/fires', (req, res) => {
  const fires = loadFires();
  const newFire = { ...req.body, id: Date.now().toString() };
  fires.push(newFire);
  saveFires(fires);
  res.status(201).json(newFire);
});
app.delete('/api/fires/:id', (req, res) => {
  const fires = loadFires().filter(f => f.id !== req.params.id);
  saveFires(fires);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`🔥 Fire API running on port ${PORT}`));
