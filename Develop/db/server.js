// Import express package
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// Our Server
const PORT = process.env.PORT || 3001;
// Initialize our app variable by setting it to the value of express()
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET request for note || API Route
app.get('/api/notes', function (req, res) {
    fs.readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        res.json(notes);   
    });
  });

// POST request for note || API Route
app.post('/api/notes', function (req, res) {
    fs.readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        const note = [].concat(JSON.parse(data));
        note.id = note.length + 1
        note.push(note);
        return note
    }).then(function(notes) {
        fs.writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
    })
});

// HTML Routes

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + './Develop/develop/public/notes.html'));
  });

// Add a static route for index.html
app.get('/', function(req, res) {
    // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(path.join(__dirname + './Develop/develop/public/index.html'));
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/develop/public/index.html'));
  });

// Listening Port
app.listen(PORT, function () {
  console.log(`App listening on PORT: 🚀` + PORT);
});