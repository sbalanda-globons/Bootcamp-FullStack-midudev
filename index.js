const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

let notes = [
  {
    id: 1,

    content: "Lorem Ipsum",

    date: "Tue Nov 09 2021 12:21:02 GMT-0300 (hora estándar de Argentina)",

    important: true,
  },

  {
    id: 2,

    content: "Lorem Ipsum 2",

    date: "Tue Nov 09 2021 12:21:02 GMT-0300 (hora estándar de Argentina)",

    important: false,
  },
];

// const app = http.createServer((req,res) => {
//     res.writeHead(200,{'Content-Type': 'application/json'})
//     res.end(JSON.stringify(notes))
// })

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const createNote = {
    id: maxId + 1,
    content: note.content,
    important: false,
    date: new Date().toISOString(),
  };

  notes = [...notes, createNote];
  res.json(createNote);
});

const PORT = process.env.PORT || 3001
app.listen(PORT);
