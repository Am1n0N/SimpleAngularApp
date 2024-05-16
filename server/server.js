const express = require("express");
const fs = require("fs");
const cors = require("cors");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

app.use((req, res, next) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);
  next();
});

// User routes
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  res.json(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ token });
});

// Camping site routes
app.get('/campsites', async (req, res) => {
  const campsites = await prisma.campingSite.findMany();
  res.json(campsites);
});

app.get('/campsites/:id', async (req, res) => {
  const { id } = req.params;
  const campsite = await prisma.campingSite.findUnique({ where: { id: parseInt(id) } });
  if (!campsite) {
    return res.status(404).json({ error: 'Camping site not found' });
  }
  res.json(campsite);
});

// Reservation routes
app.post('/reservations', async (req, res) => {
  const { userId, campingSiteId, startDate, endDate } = req.body;
  const reservation = await prisma.reservation.create({
    data: {
      user: { connect: { id: userId } },
      campingSite: { connect: { id: campingSiteId } },
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  res.json(reservation);
});

app.get('/reservations/:userId', async (req, res) => {
  const { userId } = req.params;
  const reservations = await prisma.reservation.findMany({
    where: { userId: parseInt(userId) },
    include: { campingSite: true },
  });
  res.json(reservations);

});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
