const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/logic/:module', (req, res) => {
  const modulePath = path.join(__dirname, 'logic_modules', `${req.params.module}.json`);
  if (fs.existsSync(modulePath)) {
    const data = fs.readFileSync(modulePath, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Logic module not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LogicCore API running on port ${PORT}`);
});