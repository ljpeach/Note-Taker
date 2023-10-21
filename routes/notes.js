const notes = require('express').Router();
const { readFile, writeFile } = require('fs').promises;

notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;