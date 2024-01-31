const noteList = document.getElementById('list-group');
const noteTitleInput = document.querySelector('.note-title');
const noteTextInput = document.querySelector('.note-textarea');
const saveNoteButton = document.querySelector('.save-note');
const newNoteButton = document.querySelector('.new-note');
const clearFormButton = document.querySelector('.clear-btn');

async function fetchNotes() {
  try {
    const response = await fetch('/api/notes');
    const notes = await response.json();
    console.log('Fetched notes:', notes);
    renderNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

async function saveNoteHandler() {
  const note = {
    title: noteTitleInput.value,
    text: noteTextInput.value,
  };

  await saveNote(note);
  fetchNotes(); 
}

function renderNotes(notes) {
  const listContainer = document.getElementById('list-group');
  listContainer.innerHTML = ''; 

  notes.forEach((note) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = note.title;
    listContainer.appendChild(listItem);
  });
}


document.addEventListener('DOMContentLoaded', fetchNotes);


async function saveNote(note) {
  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const savedNote = await response.json();
    console.log('Saved note:', savedNote);
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

saveNoteButton.addEventListener('click', saveNoteHandler);