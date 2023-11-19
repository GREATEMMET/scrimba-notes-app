import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selectedNote" : ""
        }`}
        onClick={props.setCurrentNoteId(note.id)}
      >
        <h4>Note {index + 1}</h4>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebarHeader">
        <h1>Notes</h1>
        <button className="newNote" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
