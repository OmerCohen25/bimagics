const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('studio'));
app.use('/api/agent', require('./studio/api/agent'));
app.listen(3000, () => console.log('Studio running on http://localhost:3000'));