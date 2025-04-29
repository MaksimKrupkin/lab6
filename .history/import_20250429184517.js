require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Employee = require('./models/Employee');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const data = JSON.parse(fs.readFileSync('employees.json', 'utf-8'));
    await Employee.deleteMany(); // Очистить коллекцию перед импортом
    await Employee.insertMany(data);
    console.log('Данные успешно импортированы!');
    process.exit();
  })
  .catch((err) => {
    console.error('Ошибка при подключении к MongoDB:', err);
    process.exit(1);
  });
