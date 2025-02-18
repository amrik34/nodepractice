const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Chef", "Waiter", "Manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});
// personSchema.index({ email: 1 }, { unique: true });

// Model
// const Person = mongoose.model("Person", personSchema);
// module.exports = Person;
// model
const person = mongoose.model("Person", personSchema);
module.exports = person;
