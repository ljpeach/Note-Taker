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

notes.delete('/:id', (req, res) => {
    readFile('./db/db.json', 'utf-8').then((data) => {
        // Ensure req.body has necessary fields.
        if (!data) {
            res.status(500).json("No Notes to delete!");
            return;
        }
        let posts = JSON.parse(data);
        if (posts.length < 1) {
            res.status(500).json("No Notes to delete!");
            return;

        }
        let hasDeleted = false;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == req.params.id) {
                posts.splice(i, 1);
                hasDeleted = true;
                break;
            }
        }
        if (hasDeleted) {
            writeFile('./db/db.json', JSON.stringify(posts, null, 2));
            res.status(201).json('Note deleted successfully');
        }
        else {
            res.status(500).json('No note with that ID found.');
        }
    })
});
module.exports = notes;