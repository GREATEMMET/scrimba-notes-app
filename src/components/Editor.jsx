import React from "react";
import ReactMde from "react-mde"; //extensible React Markdown Editor
import Showdown from "showdown"; // Showndown is a javascript markdown to HTML converter.
import "react-mde/lib/styles/css/react-mde-all.css"; //ReactMde style included

export default function Editor(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={props.currentNote.body} // The Markdown value.
        onChange={props.updateNote} // Event handler for the onChange event.
        selectedTab={selectedTab} // The currently selected tab.
        onTabChange={setSelectedTab} // Function called when the selected tab changes.
        generateMarkdownPreview={(markdoown) =>
          Promise.resolve(converter.makeHtml(markdoown))
        } // Function that should return a Promise to the generated HTML or a React element for the preview
        // minEditorHeight={}
        // minPreviewHeight={}
        heightUnits="vh"
      />
    </section>
  );
}
