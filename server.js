const fs = require('fs');
// Import express package
const express = require('express');
const path = require('path');
const util = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./db/helpers/uuid');

// Our Server
const PORT = process.env.PORT || 3001;
// Initialize our app variable by setting it to the value of express()
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET request for note || API Route
app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parseNotes = JSON.parse(dataNotes);  
    res.json(parseNotes); 
  });

// POST request for note || API Route
app.post('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parseNotes = JSON.parse(dataNotes); 
    req.body.id = uuid()
    parseNotes.push(req.body);
        
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), 'utf-8');
    res.json("Note Added Successfully!");
});

// Add a static route for index.html

app.get('/notes', (req, res) => {
  // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// Listening Port
app.listen(PORT, function () {
  console.log(`App listening on PORT: 🚀` + PORT);
});