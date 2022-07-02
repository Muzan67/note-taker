const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// Our Server
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Async Read and Write Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.static("./develop/public"));

// GET request for note || API Route
app.get('/api/notes', function (req, res) {
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        res.json(notes);   
    });
  });

// POST request for note || API Route
app.get('/api/notes', function (req, res) {
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        const note = [].concat(JSON.parse(data));
        note.id = note.length + 1
        note.push(note);
        return note
    }).then(function(notes) {
        writeFileAsync('./db/db.json', JSON.stringify(notes))
    })
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);