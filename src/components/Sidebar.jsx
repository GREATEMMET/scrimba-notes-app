import React from "react";
import s from "./Sidebar.module.scss";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`${s.title} ${
          note.id === props.currentNote.id ? s.selectedNote : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4>{note.body.split("\n")[0] || "Empty Note"}</h4>
        {/* The h4 renders the heading of the note as the title of the page.. If no heading, the title is Empty Note */}
      </div>
    </div>
  ));

  return (
    <section className={`${s.pane} ${s.sidebar}`}>
      <div className={s.sidebarHeader}>
        <h1>Notes</h1>
        <button className={s.newNote} onClick={props.newNote}>
          +
        </button>
      </div>
      <div className={s.note}>{noteElements}</div>
    </section>
  );
}
