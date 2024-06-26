const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password, name and number as arguments");
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const dbName = "personApp";
const url = `mongodb+srv://halonar:${password}@nodejstrainingcluster.itfycwx.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");

    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then((person) => {
    console.log(`added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("give password, name and number as arguments");
  mongoose.connection.close();
  process.exit(1);
}
