import "./App.scss";
import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { nanoid } from "nanoid";
import Split from "react-split";

function App() {
  //Initialize the Notes array
  const [notes, setNotes] = React.useState(
    // Get notes from local storage. Data is in JSON format. Parse to convert to javascript
    // lazy state initialization with arrow function to prevent requsting data from local storage on each render
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  // Set a current note id to point to the most recent note
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    // save notes to local storage..
    // value should be in json string format hence, stringify
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //Function to create new notes and add then to the beginning of the array
  function createNewNote() {
    const newNote = {
      id: nanoid(), // Sets the id to use the nanoid dependency which generates id automatically
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]); // newNotes comes first in the array
    setCurrentNoteId(newNote.id); // Sets currrentNodeId to the nanoid id of the new note
  }

  // Function to update note
  function updateNote(text) {
    /*
    Map through the the notes array and check if the note id is equal to the currentNoteId. If so, change the the content of the body with the "text" parameter
    */

    /* Also, we Filter all notes that are not the current note and save the current note to a variable "updatedNote". This helps us remove the updatedNote from the array and add it to the beginning of the array. The purpose of this is so that whenever an edit is made, the current note moves the top of the list.
     */

    setNotes((oldNotes) => {
      let updatedNote;

      const mappedFilteredNote = oldNotes
        .map((oldNote) =>
          oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote
        )
        .filter((note) => {
          if (note.id !== currentNoteId) {
            return true;
          } else {
            updatedNote = note;
            return false;
          }
        });

      mappedFilteredNote.unshift(updatedNote);
      const rearrangedNote = mappedFilteredNote;
      return rearrangedNote;
    });
  }

  // Functiion to find note. Returns the note that matches the condition.
  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 75]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="noNotes">
          <h1>You have no notes</h1>
          <button className="firstNote" onClick={createNewNote}>
            Create one now
          </button>
        </div> 
      )}
    </main>
  );
}

export default App;
