const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const DBURL = `mongodb+srv://erlendeelmets:${password}@helsinki.nlyioyo.mongodb.net/?retryWrites=true&w=majority&appName=Helsinki`;

mongoose.set("strictQuery", false);
mongoose.connect(DBURL);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name: name,
  number: number,
});

person.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook`);
});

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
