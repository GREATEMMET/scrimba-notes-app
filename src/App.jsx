import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { nanoid } from "nanoid";

function App() {
  //Initialize the Notes array
  const [notes, setNotes] = React.useState([]);
  // Set a current note id to point to the most recent note
  const [currentNoteId, setCurrentNodeId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );


  //Function to create new notes and add then to the beginning of the array
  function createNewNote() {
    const newNote = {
      id: nanoid(), //Sets the id to use the nanoid dependency which generates id automatically
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]); //newNotes comes first in the array
    setCurrentNodeId(newNote.id); //Sets currrentNodeId to the nanoid id of the new note
  }

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;
