const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('studio'));
// Serve the API from the local "api" directory. The previous path
// mistakenly looked for "studio/api" relative to this file, which
// resulted in a "Cannot find module" error when starting the server.
app.use('/api/agent', require('./api/agent'));
app.listen(3000, () => console.log('Studio running on http://localhost:3000'));