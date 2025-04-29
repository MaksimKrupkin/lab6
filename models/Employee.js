const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  position: String,
  department: String,
  email: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
