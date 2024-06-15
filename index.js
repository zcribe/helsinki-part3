const express = require("express");
const app = express();
app.use(express.json());

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 9000)
    const person = request.body;
    person.id = id;
    data = data.concat(person);
    response.json(person);

})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    data = data.filter((person) => person.id !== id)
    response.status(204).end()
})

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${data.length} people<br/>${new Date()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
