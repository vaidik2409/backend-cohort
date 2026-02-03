import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function submitHandle(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);

        fetchNotes();
      });
  }

  function deleteNote(id) {
    axios.delete("http://localhost:3000/api/notes/"+id)
    .then(res=>{
      console.log(res.data);
      fetchNotes();
    })
  }

  function updateNote(id) {
    axios.patch("http://localhost:3000/api/notes/"+id,{
      description: "Updated Description"
    })
    .then(res=>{
      console.log(res.data);

      fetchNotes();
      
    })
  }

  return (
    <>
      <form className="note-create-form" onSubmit={submitHandle}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=> {deleteNote(note._id)}}>delete</button>
              <button onClick={()=>{updateNote(note._id)}}>Update data</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
