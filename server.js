//Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('./helpers/uuid'); 
const db = require('./db/db.json')

const app = express();
const PORT = 3000;

//have to use middleware for JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//create my routes 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/api/notes', async (req, res) => {
  try {
    const notesData = await fs.promises.readFile(path.join(__dirname, './db/db.json'), 'utf8');
    const notes = JSON.parse(notesData);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



app.post('/api/notes', async (req, res) => {
  try {
    const newNote = req.body;
    newNote.id = generateUniqueId();

    const notes = JSON.parse(await fs.promises.readFile(path.join(__dirname, './db/db.json'), 'utf8'));
    notes.push(newNote);

    await fs.promises.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), 'utf8');

    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});