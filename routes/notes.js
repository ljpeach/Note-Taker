const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs').promises;

notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFile('./db/db.json', 'utf-8').then((data) => {
        // Ensure req.body has necessary fields.
        if (!(req.body.title && req.body.text)) {
            res.status(500).json('Could not add note. Error with request body.');
            return;
        };
        // Parse data. If db file is empty, default to empty array to avoid error.
        let posts;
        if (data) {
            posts = JSON.parse(data);
        }
        else {
            posts = [];
        }
        let postToAdd = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        posts.push(postToAdd);
        writeFile('./db/db.json', JSON.stringify(posts, null, 2));
        res.status(201).json('Note added successfully');
    })
});

module.exports = notes;