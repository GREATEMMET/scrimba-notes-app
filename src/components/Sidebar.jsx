import React from "react";
import s from "./Sidebar.module.scss";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`${s.title} ${
          note.id === props.currentNote.id ? s.selectedNote : ""
        }`}
        onClick={()=>props.setCurrentNoteId(note.id)}
      >
        <h4>Note {index + 1}</h4>
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

