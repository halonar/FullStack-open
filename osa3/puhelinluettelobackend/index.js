require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
//app.use(requestLogger);
app.use(cors());

//app.use(morgan("combined"));
//app.use(morgan("tiny"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define a new token 'body' for Morgan
morgan.token("body", function (req /*, res*/) {
  return JSON.stringify(req.body);
});

// Use Morgan middleware with a custom format that includes the 'body' token
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let personsLocal = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "make",
    number: "444-444",
    id: 5,
  },
];

app.get("/info", (request, response, next) => {
  const now = new Date();
  const currentDate = now.toString();
  console.log(currentDate);

  Person.find({})
    .then((persons) => {
      const info = `<h5>Phonebook has info for ${persons.length} people <br>${currentDate}</h5>`;
      response.send(info);
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line no-unused-vars
const generateId = () => {
  const maxId =
    personsLocal.length > 0 ? Math.max(...personsLocal.map((n) => n.id)) : 0;
  return maxId + 1;
};

const generateRandomId = (min, max) => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const findNewId = true;

  while (findNewId) {
    let newId = getRandomInt(min, max);

    if (!personsLocal.find((person) => person.id === newId)) {
      console.log(newId);
      return newId;
    }
  }
};

//post without db
app.post("/api/persons/XXX", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (personsLocal.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const min = 1;
  const max = 8;

  console.log("persons.length", personsLocal.length);

  if (personsLocal.length >= max - 1) {
    return response.status(400).json({
      error: "telephone directory is full",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(min, max),
  };

  personsLocal = personsLocal.concat(person);

  response.json(person);
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (updatedPerson !== null) {
        console.log("updated=", updatedPerson);
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (
    error.name === "ValidationError" ||
    error.name === "MongoServerError"
  ) {
    return response.status(400).json({ error: error.message });
  } else {
    console.error("ERROR: ", error.message, ":", error.name);
  }

  next(error);
};

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler);

//const PORT = 3001;
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
