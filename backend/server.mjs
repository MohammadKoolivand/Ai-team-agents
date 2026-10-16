import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Dummy data for demonstration
const users = [];
const loans = [];

// User management
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  res.status(201).send(newUser);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
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