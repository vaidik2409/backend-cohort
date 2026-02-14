import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  // Fetch all notes
  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create new note
  function submitHandle(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
        e.target.reset();
      });
  }

  // Delete a note
  function deleteNote(id) {
    axios.delete("http://localhost:3000/api/notes/" + id).then(() => {
      fetchNotes();
    });
  }

  // Start editing a note
  function startEdit(note) {
    setEditingId(note._id);
    setEditingTitle(note.title);
    setEditingDescription(note.description);
  }

  // Save edited note
  function saveEdit(id) {
    axios
      .patch("http://localhost:3000/api/notes/" + id, {
        title: editingTitle,
        description: editingDescription,
      })
      .then(() => {
        setEditingId(null);
        fetchNotes();
      });
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <>
       {/* CREATE NOTE FORM  */}
      <form className="note-create-form" onSubmit={submitHandle}>
        <input name="title" type="text" placeholder="Enter Title" required />
        <textarea
          name="description"
          placeholder="Enter Description"
          required
        ></textarea>
        <button>Create Note</button>
      </form>

      {/* NOTES LIST */}
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            {editingId === note._id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <textarea
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </>
            )}

            <div className="note-actions">
              {editingId === note._id ? (
                <>
                  <button onClick={() => saveEdit(note._id)}>Save</button>
                  <button onClick={cancelEdit} className="delete-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(note)}>Update</button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;