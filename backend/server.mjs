import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Dummy data for demonstration
const users = [];
const loans = [];

// User management
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).send(newUser);
});

app.get('/users', (req, res) => {
  res.send(users);
});

// Loan management
app.post('/loans', (req, res) => {
  const newLoan = req.body;
  loans.push(newLoan);
  res.status(201).send(newLoan);
});

app.get('/loans', (req, res) => {
  res.send(loans);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});