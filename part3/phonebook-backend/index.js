const express = require("express");
const morgan = require("morgan");

const app = express();
morgan.token("payload", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get("/info", (req, res) => {
  let response = `Phonebook has info for ${persons.length} people`;
  response += `<p>${new Date()}</p>`;
  res.send(response);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      "error": "name is missing"
    });
  }

  if (!body.number) {
    return res.status(400).json({
      "error": "number is missing"
    });
  }

  const duplicate = persons.find(p => p.name === body.name);

  if (duplicate) {
    return res.status(400).json({
      "error": "name must be unique"
    });
  }

  const person = {
    ...body,
    id: Math.floor(Math.random() * 1000000)
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}…`);
});
