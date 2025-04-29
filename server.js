require('dotenv').config();
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.json());

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findOne({ id: req.params.id });
  res.json(employee);
});

app.get('/api/photo-info', (req, res) => {
  fs.readFile('public/employee_photo.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.send(data);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
