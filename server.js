const express = require('express');
const api = require('./routes/index');
const path = require('path');
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

// GET route for home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// GET route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// GET route for any other page (send to homepage)
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));