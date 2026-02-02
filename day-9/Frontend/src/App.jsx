import { useState } from 'react'
import axios from "axios";

function App() {

  const [notes, setnotes] = useState([
    {
    title: "test title 1",
    description:"Test description"
  },
  {
    title: "test title 2",
    description:"Test description"
  },
  {
    title: "test title 3",
    description:"Test description"
  },
  {
    title: "test title 4",
    description:"Test description"
  }
])

axios.get("http://localhost:3000/api/notes")
.then(res=>{
  setnotes(res.data.notes);
})

  return (
    <>
      <div className="notes">
        {
          notes.map(note=>{
            return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
